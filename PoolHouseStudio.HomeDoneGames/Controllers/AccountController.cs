using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PoolHouseStudio.HomeDoneGames.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }
    }
}
