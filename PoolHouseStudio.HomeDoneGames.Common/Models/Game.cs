using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Common.Models
{
    public class Game
    {
        public Game()
        {
            Players = new Dictionary<string, Player>();
        }

        public Player CurrentTurn { get; set; }
        public GameManager GameManager { get; set; }
        public int GameTypeID { get; set; }
        public bool IsStarted { get; set; }
        public string RoomCode { get; set; }
        public Dictionary<string, Player> Players { get; set; }
        public int RoundNumber { get; set; }
        public IList<Player> TurnOrder { get; set; }
    }
}
