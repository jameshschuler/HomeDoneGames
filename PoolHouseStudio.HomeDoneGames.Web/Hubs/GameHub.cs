using Microsoft.AspNetCore.SignalR;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Hubs
{
    public class GameHub : Hub
    {
        private readonly IRoomService _roomService;

        private IList _managers = new List<GameManager>();

        public GameHub(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        // TODO: verify connection is a valid game manager client app 
        // [Authorize]
        public async Task GenerateRoomCode(int gameTypeID)
        {
            try
            {
                var response = await _roomService.CreateRoom(gameTypeID);
                var guid = new Guid();
                var name = $"GameManager_{guid}";

                await Groups.AddToGroupAsync(Context.ConnectionId, name);

                // TODO: add logic to prevent adding manager twice if they want to generate another room code
                _managers.Add(new GameManager {
                    ConnnectionId = Context.ConnectionId,
                    Name = name
                });
                
                var hubSuccessResponse = new HubSuccessResponse
                {
                    Data = response,
                    Message = "Room was created.",
                    Method = "GenerateRoomCode"
                };

                await SendSuccessResponse(hubSuccessResponse);
            } 
            catch (Exception ex)
            {
                await SendErrorResponse(new HubErrorResponse {
                    Message = ex.Message,
                    Method = "GenerateRoomCode"
                });
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

    // TODO: temp
    public class GameManager
    {
        public string ConnnectionId { get; set; }
        public string Name { get; set; }
    }
}
