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
        private readonly IRoomService _roomService;

        private IList _managers = new List<GameManager>();

        private static Dictionary<string, Player> _players = new Dictionary<string, Player>();

        public GameHub( IRoomService roomService )
        {
            _roomService = roomService;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
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
                _managers.Add( new GameManager
                {
                    ConnnectionId = Context.ConnectionId,
                    Name = name
                } );

                var hubSuccessResponse = new HubSuccessResponse
                {
                    Data = response,
                    Message = "Room was created.",
                    Method = "GenerateRoomCode"
                };

                await SendSuccessResponse( hubSuccessResponse );
            }
            catch ( Exception ex )
            {
                await SendErrorResponse( new HubErrorResponse
                {
                    Message = ex.Message,
                    Method = "GenerateRoomCode"
                } );
            }
        }

        
        public async Task JoinRoomAsClient( JoinRoomRequest joinRoomRequest )
        {
            // todo: ensure name is present
            if ( string.IsNullOrWhiteSpace(joinRoomRequest.Name) )
            {
                await SendErrorResponse( new HubErrorResponse { Message = "Must enter a player name", Method = "JoinRoomAsClient", Title = "Validation Error" } );
                return;
            }

            var response = await _roomService.ValidateRoom( joinRoomRequest.RoomCode );
            if ( !response.IsValid || response.IsExpired )
            {
                await SendErrorResponse( new HubErrorResponse { Message = response.Message, Method = "JoinRoomAsClient", Title = "Room Error" } );
                return;
            }

            var groupName = $"ClientGroup_{joinRoomRequest.RoomCode}";
            await Groups.AddToGroupAsync( Context.ConnectionId, groupName );

            var player = new Player
            {
                Name = joinRoomRequest.Name,
                RoomCode = joinRoomRequest.RoomCode,
                GroupName = groupName
            };
            _players.Add( Context.ConnectionId, player ); // TODO: is this even useful?

            await SendSuccessResponse( new HubSuccessResponse { Data = new JoinRoomResponse {Player = player }, Message = "Joined!", Method = "JoinRoomAsClient" } );

            // TODO: update all clients and manager that player has joined
            await Clients.Group( groupName ).SendAsync("PlayerJoined", new PlayerJoinedResponse { Players = _players.Values.ToList() } );
        }

        public async Task SendSuccessResponse( HubSuccessResponse hubSuccessResponse )
        {
            await Clients.Caller.SendAsync( "SendSuccessResponse", hubSuccessResponse );
        }

        public async Task SendErrorResponse( HubErrorResponse hubErrorResponse )
        {
            await Clients.Caller.SendAsync( "SendErrorResponse", hubErrorResponse );
        }

        // TODO: implement or change methods to handle sending success/error messages to all clients
        // TODO: make each player unique somehow
        // TODO: handle add/remove players
    }

    // TODO: temp
    public class GameManager
    {
        public string ConnnectionId { get; set; }
        public string Name { get; set; }
    }
}
