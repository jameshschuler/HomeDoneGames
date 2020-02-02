using PoolHouseStudio.HomeDoneGames.Common.Models;
using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class PlayerJoinedResponse
    {
        public PlayerJoinedResponse()
        {
            Players = new List<Player>();
        }

        public IList<Player> Players { get; set; }
    }
}
