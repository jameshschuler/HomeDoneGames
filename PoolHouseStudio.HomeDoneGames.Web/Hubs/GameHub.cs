using Microsoft.AspNetCore.SignalR;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.Common.Models;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameTypeService _gameTypeService;
        private readonly IRoomService _roomService;
        private readonly IHubService _hubService;

        private IList _managers = new List<GameManager>();

        public static Dictionary<string, Game> _games = new Dictionary<string, Game>();

        public GameHub( IGameTypeService gameTypeService, IHubService hubService, IRoomService roomService )
        {
            _gameTypeService = gameTypeService;
            _hubService = hubService;
            _roomService = roomService;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync( Exception exception )
        {
            // TODO: how can we get the room code in order to find the game to remove the player from?
            // or should we just query the player list again when the client detects a disconnect event?
            // TODO: _games.Remove( Context.ConnectionId );

            await base.OnDisconnectedAsync( exception );
        }

        // TODO: verify connection is a valid game manager client app 
        // [Authorize]
        public async Task GenerateRoomCode( int gameTypeID )
        {
            try
            {
                var response = await _roomService.CreateRoom( gameTypeID );
                
                var guid = new Guid();
                var name = $"GameManager_{guid}";
                await Groups.AddToGroupAsync( Context.ConnectionId, name );

                // TODO: add logic to prevent adding manager twice if they want to generate another room code
                var gameManager = new GameManager
                {
                    ConnnectionId = Context.ConnectionId,
                    Name = name
                };

                _managers.Add( gameManager );
                _games.Add( response.RoomCode, new Game { GameManager = gameManager, GameTypeID = gameTypeID } );

                var hubSuccessResponse = new HubSuccessResponse
                {
                    Data = response,
                    Message = "Room was created.",
                    Method = "GenerateRoomCode"
                };

                await SendSuccessResponseToCaller( hubSuccessResponse );
            }
            catch ( Exception ex )
            {
                await SendErrorResponseToCaller( new HubErrorResponse
                {
                    Message = ex.Message,
                    Method = "GenerateRoomCode"
                } );
            }
        }

        // TODO: move validation to separate method
        public async Task JoinRoomAsClient( JoinRoomRequest joinRoomRequest )
        {
            if ( string.IsNullOrWhiteSpace(joinRoomRequest.Name) )
            {
                await SendErrorResponseToCaller( new HubErrorResponse { Message = "Must enter a player name", Method = "JoinRoomAsClient", Title = "Validation Error" } );
                return;
            }

            var roomCode = joinRoomRequest.RoomCode;
            var response = await _roomService.ValidateRoom( roomCode );
            if ( !response.IsValid || response.IsExpired )
            {
                await SendErrorResponseToCaller( new HubErrorResponse { Message = response.Message, Method = "JoinRoomAsClient", Title = "Room Error" } );
                return;
            }

            var room = await _roomService.GetRoom(roomCode);
            var game = _games.FirstOrDefault( e => e.Key == roomCode ).Value;
            if (game == null)
            {
                game = new Game();
                _games.Add( roomCode, game );
            }

            var groupName = $"ClientGroup_{roomCode}";
            var player = new Player
            {
                Name = joinRoomRequest.Name,
                RoomCode = roomCode,
                GroupName = groupName
            };

            if (game.Players.Count < room.GameType.MaxPlayers)
            {
                if ( game.Players.Any( e => e.Key == Context.ConnectionId ) )
                {
                    await SendErrorResponseToCaller( new HubErrorResponse { Message = "Player is already connected.", Method = "JoinRoomAsClient" } );
                    return;
                }

                game.Players.Add( Context.ConnectionId, player );
                await Groups.AddToGroupAsync( Context.ConnectionId, groupName );
            }
            else
            {
                // TODO: what to do with player joining if they are outside the max player count? add as spectator? 
                await SendErrorResponseToCaller( new HubErrorResponse { Message = "Game is already full!", Method = "JoinRoomAsClient" } );
                return;
            }

            await SendSuccessResponseToCaller( new HubSuccessResponse { Data = new JoinRoomResponse {
                Description = room.GameType.Description,
                GameName = room.GameType.GameName,
                Player = player,
                MinPlayers = room.GameType.MinPlayers,
                RoomCode = room.RoomCode
            }, Message = "Joined!", Method = "JoinRoomAsClient" } );
            await Clients.Group( groupName ).SendAsync("PlayersUpdated", new PlayersUpdatedResponse { Players = game.Players.Values.ToList() } );
        }

        public async Task SendSuccessResponseToCaller( HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Caller.SendAsync( "SendSuccessResponseToCaller", hubSuccessResponse );
        }

        public async Task SendErrorResponseToCaller( HubErrorResponse hubErrorResponse )
        {
            await Clients.Caller.SendAsync( "SendErrorResponseToCaller", hubErrorResponse );
        }

        // TODO: implement or change methods to handle sending success/error messages to all clients
        // TODO: handle add/remove players
    }
}
