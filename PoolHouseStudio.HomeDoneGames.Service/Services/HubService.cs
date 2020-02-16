using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.Common.Models;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Service.Services
{
    public interface IHubService
    {
        HubResponse DisconnectPlayer( string connectionId );
        HubResponse CreateGame( string connectionId, Room  room, CreateRoomRequest request );
        GameManager GetGameManager( string roomCode );
        IList<Player> GetPlayers( string roomCode );
        Task<HubResponse> JoinRoom( string connectionId, JoinRoomRequest joinRoomRequest );
        Task<HubResponse> StartGame( string roomCode );
    }

    public class HubService : IHubService
    {
        // connection id
        private static Dictionary<string, Player> _players = new Dictionary<string, Player>();

        // room code
        private static Dictionary<string, GameManager> _managers = new Dictionary<string, GameManager>();

        // room code
        public static Dictionary<string, Game> _games = new Dictionary<string, Game>();

        private readonly IRoomRepository _roomRepository;

        public HubService( IRoomRepository roomRepository )
        {
            _roomRepository = roomRepository;
        }

        public HubResponse CreateGame( string connectionId, Room room, CreateRoomRequest request )
        {
            if ( _games.FirstOrDefault( e => e.Key == room.RoomCode ).Value != null )
            {
                return new HubErrorResponse { Message = "Game already exists!", Method = "CreateRoom" };
            }

            var game = new Game
            {
                GameTypeID = room.GameTypeID,
                RoomCode = room.RoomCode,
                GroupName = $"GameClient_{room.RoomCode}"
            };

            _games.Add( room.RoomCode, game );

            var player = new Player
            {
                GroupName = game.GroupName,
                IsFirstPlayer = true,
                Lives = 3, // TODO: this value will come from the GameType object
                Name = request.PlayerName,
                RoomCode = room.RoomCode,
                Score = 0,
            };

            game.Players.Add( connectionId, player );
            _players.Add( connectionId, player );

            return new HubSuccessResponse
            {
                Data = new CreateRoomResponse
                {
                    Player = player,
                    RoomCode = room.RoomCode,
                },
                Message = "Room was created!",
                Method = "CreateRoom"
            };
        }

        public HubResponse DisconnectPlayer( string connectionId )
        {
            var player = _players.FirstOrDefault( e => e.Key == connectionId ).Value;
            if ( player == null )
            {
                return null;
            }

            var roomCode = player.RoomCode;
            var game = _games.FirstOrDefault( e => e.Key == roomCode ).Value;

            game.Players.Remove( connectionId );
            _players.Remove( connectionId );

            if ( game.Players.Any() )
            {
                game.Players.First().Value.IsFirstPlayer = true;
            }
            else
            {
                // If no players, just clean up the games list (by removing game)
                _games.Remove( roomCode );
            }

            return new HubSuccessResponse
            {
                Data = new PlayersUpdatedResponse
                {
                    GroupName = player.GroupName,
                    Players = game.Players.Values.ToList()
                }
            };
        }

        public GameManager GetGameManager( string roomCode )
        {
            return _managers.FirstOrDefault( e => e.Key == roomCode ).Value;
        }

        public IList<Player> GetPlayers( string roomCode )
        {
            var game = _games.FirstOrDefault( e => e.Key == roomCode ).Value;
            var players = game.Players.Values.ToList();
            return players;
        }

        public async Task<HubResponse> JoinRoom( string connectionId, JoinRoomRequest joinRoomRequest )
        {
            if ( string.IsNullOrWhiteSpace( joinRoomRequest.Name ) )
            {
                return new HubErrorResponse { Message = "Must enter a player name", Method = "JoinRoomAsClient", Title = "Validation Error" };
            }

            var includeProperties = string.Join( ",", "GameType" );
            var room = await _roomRepository.FirstOrDefault( e => e.RoomCode == joinRoomRequest.RoomCode, includeProperties );

            var game = _games.FirstOrDefault( e => e.Key == room.RoomCode ).Value;

            var player = new Player
            {
                Name = joinRoomRequest.Name,
                RoomCode = joinRoomRequest.RoomCode,
                GroupName = game.GroupName,
                IsFirstPlayer = game.Players.Count() == 0
            };

            if ( game.Players.Count < room.GameType.MaxPlayers )
            {
                if ( game.Players.Any( e => e.Key == connectionId ) )
                {
                    return new HubErrorResponse { Message = "Player is already connected.", Method = "JoinRoomAsClient" };
                }

                game.Players.Add( connectionId, player );
                _players.Add( connectionId, player );
            }
            else
            {
                // TODO: what to do with player joining if they are outside the max player count? add as spectator? 
                return new HubErrorResponse { Message = "Game is already full!", Method = "JoinRoomAsClient" };
            }

            return new HubSuccessResponse
            {
                Data = new JoinRoomResponse
                {
                    Description = room.GameType.Description,
                    GameName = room.GameType.GameName,
                    GroupName = game.GroupName,
                    Player = player,
                    MinPlayers = room.GameType.MinPlayers,
                    RoomCode = room.RoomCode
                },
                Message = "Joined!",
                Method = "JoinRoomAsClient"
            };
        }

        public async Task<HubResponse> StartGame( string roomCode )
        {
            var game = _games.FirstOrDefault( e => e.Key == roomCode ).Value;

            var includeProperties = string.Join( ",", "GameType" );
            var room = await _roomRepository.FirstOrDefault( e => e.RoomCode == roomCode, includeProperties );
            
            if ( game.Players.Count() < room.GameType.MinPlayers )
            {
                return new HubErrorResponse { Message = $"{room.GameType.GameName} needs at least {room.GameType.MinPlayers} players to start.", Method = "StartGame" };
            }

            var didStartGame = game.StartGame();

            if(!didStartGame)
            {
                return new HubErrorResponse { Message = $"Game was already started!", Method = "StartGame" };
            }

            return new HubSuccessResponse
            {
                Data = new StartGameResponse
                {
                   CurrentTurn = game.CurrentTurn,
                   IsStarted = game.IsStarted,
                   RoundNumber = game.RoundNumber,
                   TurnOrder = game.TurnOrder,
                },
                Message = "Started Game!",
                Method = "StartGame"
            };
        }
    }
}
