using Microsoft.AspNetCore.Mvc;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Controllers
{
    [ApiController]
    [Route("api/gameType")]
    public class GameTypeController : ControllerBase
    {
        private readonly IGameTypeService GameTypeService;

        public GameTypeController(IGameTypeService gameTypeService)
        {
            GameTypeService = gameTypeService;
        }

        [HttpGet]
        [Route("", Name = "GetGameTypes")]
        public Task GetGameTypes()
        {
            return GameTypeService.GetGameTypes();
        }
    }
}
