using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Common.Models
{
    public class RoundData
    {
        public RoundData()
        {
            Answers = new Dictionary<string, NeverHaveIEverAnswer>();
        }

        public string Statement { get; set; }
        public int RoundNumber { get; set; }

        // ConnectionId
        public Dictionary<string, NeverHaveIEverAnswer> Answers { get; set; }
    }
}
