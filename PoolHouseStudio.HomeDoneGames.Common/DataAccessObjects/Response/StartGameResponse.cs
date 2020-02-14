using PoolHouseStudio.HomeDoneGames.Common.Models;
using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class StartGameResponse
    {
        public Player CurrentTurn { get; set; }
        public bool IsStarted { get; set; }
        public int RoundNumber { get; set; }
        public Dictionary<string, Player> TurnOrder { get; set; }
    }
}
