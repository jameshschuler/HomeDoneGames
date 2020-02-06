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

        private static Dictionary<string, GameManager> _managers = new Dictionary<string, GameManager>();

        public static Dictionary<string, Game> _games = new Dictionary<string, Game>();
        public static Dictionary<string, Player> _connectedPlayers = new Dictionary<string, Player>();

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
            var response = _hubService.DisconnectPlayer( Context.ConnectionId );
            if ( response != null )
            {
                var successResponse = (HubSuccessResponse) response;
                var data = (PlayersUpdatedResponse) successResponse.Data;

                await SendSuccessResponseToGroup( data.GroupName, new HubSuccessResponse
                {
                    Data = data,
                    Method = "PlayersUpdated",
                    Message = "A Player Has Disconnected"
                } );
            }

            await base.OnDisconnectedAsync( exception );
        }

        // TODO: verify connection is a valid game manager client app 
        // TODO: move into hub service
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

                var gameManager = _managers.FirstOrDefault( e => e.Key == Context.ConnectionId ).Value;
                if ( gameManager == null )
                {
                    gameManager = new GameManager
                    {
                        ConnnectionId = Context.ConnectionId,
                        Name = name
                    };
                    _managers.Add( Context.ConnectionId, gameManager );
                }

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

        public async Task JoinRoomAsClient( JoinRoomRequest joinRoomRequest )
        {
            var result = await ValidateJoinRoomRequest( joinRoomRequest );
            if ( result != null )
            {
                await SendErrorResponseToCaller( result );
                return;
            }

            var response = await _hubService.JoinRoom( Context.ConnectionId, joinRoomRequest );

            if ( response.GetType() == typeof( HubErrorResponse ) )
            {
                await SendErrorResponseToCaller( (HubErrorResponse) response );
                return;
            }

            var successResponse = (HubSuccessResponse) response;
            var data = (JoinRoomResponse) successResponse.Data;

            await Groups.AddToGroupAsync( Context.ConnectionId, data.GroupName );
            await SendSuccessResponseToCaller( successResponse );

            await SendSuccessResponseToGroup( data.GroupName, new HubSuccessResponse
            {
                Data = new PlayersUpdatedResponse { Players = _hubService.GetPlayers( data.RoomCode ) },
                Method = "PlayersUpdated",
                Message = "A New Player Has Joined!"
            } );
        }

        public async Task SendSuccessResponseToCaller( HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Caller.SendAsync( "SendSuccessResponseToCaller", hubSuccessResponse );
        }

        public async Task SendErrorResponseToCaller( HubErrorResponse hubErrorResponse )
        {
            await Clients.Caller.SendAsync( "SendErrorResponseToCaller", hubErrorResponse );
        }

        public async Task SendSuccessResponseToGroup( string groupName, HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Group( groupName ).SendAsync( "SendSuccessResponseToCaller", hubSuccessResponse );
        }

        public async Task SendErrorResponseToGroup( string groupName, HubErrorResponse hubErrorResponse )
        {
            await Clients.Group( groupName ).SendAsync( "SendErrorResponseToCaller", hubErrorResponse );
        }

        #region Private Methods

        private async Task<HubErrorResponse> ValidateJoinRoomRequest( JoinRoomRequest request )
        {
            if ( string.IsNullOrWhiteSpace( request.Name ) )
            {
                return new HubErrorResponse { Message = "Must enter a player name", Method = "JoinRoomAsClient", Title = "Validation Error" };
            }

            var roomCode = request.RoomCode;
            var response = await _roomService.ValidateRoom( roomCode );
            if ( !response.IsValid || response.IsExpired )
            {
                return new HubErrorResponse { Message = response.Message, Method = "JoinRoomAsClient", Title = "Room Error" };
            }

            return null;
        }

        #endregion
    }
}
