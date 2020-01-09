using Microsoft.AspNetCore.Mvc;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request;
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
        public RoomController()
        {

        }

        [HttpPost]
        public IActionResult CreateRoom([FromBody]CreateRoomRequest createRoomRequest)
        {
            if (createRoomRequest == null)
            {
                return NotFound();
            }

            
            return Ok();
        }
    }
}
