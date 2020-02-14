using Microsoft.AspNetCore.SignalR;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using System;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameTypeService _gameTypeService;
        private readonly IRoomService _roomService;
        private readonly IHubService _hubService;

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
                var roomID = await _roomService.CreateRoom( gameTypeID );

                var response = await _hubService.CreateGame( Context.ConnectionId, roomID );

                if ( response.GetType() == typeof( HubErrorResponse ) )
                {
                    await SendErrorResponseToCaller( (HubErrorResponse) response );
                    return;
                }

                var successResponse = (HubSuccessResponse) response;
                var data = (CreateGameResponse) successResponse.Data;
                
                await Groups.AddToGroupAsync( Context.ConnectionId, data.ManagerGroupName );
                await SendSuccessResponseToCaller( successResponse );
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

            var gameManager = _hubService.GetGameManager(data.RoomCode);
            await SendSuccessResponseToGameManager( gameManager.ConnnectionId, new HubSuccessResponse
            {
                Data = new PlayersUpdatedResponse { Players = _hubService.GetPlayers( data.RoomCode ) },
                Method = "PlayersUpdated",
                Message = "A New Player Has Joined!"
            } );
        }

        public async Task StartGame( StartGameRequest startGameRequest )
        {
            var response = await _hubService.StartGame( startGameRequest.RoomCode );

            if ( response.GetType() == typeof( HubErrorResponse ) )
            {
                await SendErrorResponseToCaller( (HubErrorResponse) response );
                return;
            }

            var successResponse = (HubSuccessResponse) response;
            var data = (StartGameResponse) successResponse.Data;

            // TODO: update everyone!
        }

        #region Private Methods

        private async Task SendSuccessResponseToCaller( HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Caller.SendAsync( "SendSuccessResponse", hubSuccessResponse );
        }

        private async Task SendErrorResponseToCaller( HubErrorResponse hubErrorResponse )
        {
            await Clients.Caller.SendAsync( "SendErrorResponse", hubErrorResponse );
        }

        private async Task SendSuccessResponseToGroup( string groupName, HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Group( groupName ).SendAsync( "SendSuccessResponse", hubSuccessResponse );
        }

        private async Task SendErrorResponseToGroup( string groupName, HubErrorResponse hubErrorResponse )
        {
            await Clients.Group( groupName ).SendAsync( "SendErrorResponse", hubErrorResponse );
        }

        private async Task SendSuccessResponseToGameManager( string connectionId, HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Client( connectionId ).SendAsync( "SendSuccessResponse", hubSuccessResponse );
        }

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
