using PoolHouseStudio.HomeDoneGames.Common.Models;
using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class PlayersUpdatedResponse
    {
        public PlayersUpdatedResponse()
        {
            Players = new List<Player>();
        }

        public string GroupName { get; set; }

        public IList<Player> Players { get; set; }
    }
}
