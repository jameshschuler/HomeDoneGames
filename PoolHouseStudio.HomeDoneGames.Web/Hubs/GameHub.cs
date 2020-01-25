using Microsoft.AspNetCore.SignalR;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Hubs
{
    public class GameHub : Hub
    {
        private readonly IRoomService _roomService;

        public GameHub(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public async Task GenerateRoomCode(int gameTypeID)
        {
            try
            {
                var response = await _roomService.CreateRoom(gameTypeID);

                var hubSuccessResponse = new HubSuccessResponse
                {
                    Data = response,
                    Message = "Room was created."
                };

                await SendSuccessResponse(hubSuccessResponse);
            } 
            catch (Exception ex)
            {
                await SendErrorResponse(new HubErrorResponse { });
            }
        }

        // TODO: verify connection is a valid game manager client app 
        public async Task AddToManagerGroup()
        {
            try
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, "GameManager");
                await SendSuccessResponse(new HubSuccessResponse { Message = "Connection was added to group." });
            } 
            catch(Exception)
            {
                await SendErrorResponse(new HubErrorResponse { });
            }
        }

        public async Task SendSuccessResponse(HubSuccessResponse hubSuccessResponse)
        {
            await Clients.Caller.SendAsync("SendSuccessResponse", hubSuccessResponse);
        }

        public async Task SendErrorResponse(HubErrorResponse hubErrorResponse)
        {
            await Clients.Caller.SendAsync("SendErrorResponse", hubErrorResponse);
        }

        // TODO: implement or change methods to handle sending success/error messages to all clients
    }
}
