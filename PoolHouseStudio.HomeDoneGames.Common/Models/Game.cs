using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Common.Models
{
    public class Game
    {
        public Game()
        {
            Players = new Dictionary<string, Player>();
        }

        public int GameTypeID { get; set; }
        public string RoomCode { get; set; }
        public Dictionary<string, Player> Players { get; set; }
        public GameManager GameManager { get; set; }
    }
}
