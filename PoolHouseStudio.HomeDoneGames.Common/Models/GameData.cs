using System;
using System.Collections.Generic;
using System.Text;

namespace PoolHouseStudio.HomeDoneGames.Common.Models
{
    public class GameData
    {
        public GameData()
        {
            Rounds = new List<RoundData>();
        }

        public IEnumerable<RoundData> Rounds { get; set; }
    }
}
