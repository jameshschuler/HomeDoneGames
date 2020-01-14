using Microsoft.AspNetCore.Mvc;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Controllers
{
    [ApiController]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody]CreateRoomRequest createRoomRequest)
        {
            if (createRoomRequest == null)
            {
                return BadRequest();
            }

            var response = await _roomService.CreateRoom(createRoomRequest.GameTypeID);
            
            return Ok(response);
        }

        [HttpGet]
        [Route("{roomCode}/validate")]
        public async Task<IActionResult> ValidateRoom(string roomCode)
        {
            if (roomCode == null)
            {
                return BadRequest();
            }

            var response = await _roomService.ValidateRoom(roomCode);

            if (response.IsValid && !response.IsExpired)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }
    }
}
