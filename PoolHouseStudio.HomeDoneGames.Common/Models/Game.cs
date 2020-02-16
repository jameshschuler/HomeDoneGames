using System;
using System.Collections.Generic;
using System.Linq;

namespace PoolHouseStudio.HomeDoneGames.Common.Models
{
    public class Game
    {
        private static readonly Random random = new Random();

        public Game()
        {
            Players = new Dictionary<string, Player>();
        }

        public Player CurrentTurn { get; private set; }
        public string GroupName { get; set; }
        public int GameTypeID { get; set; }
        public bool IsStarted { get; private set; }
        public Dictionary<string, Player> Players { get; set; }
        public string RoomCode { get; set; }
        public int RoundNumber { get; private set; }
        public Dictionary<string, Player> TurnOrder { get; private set; }

        public bool StartGame()
        {
            if ( IsStarted )
            {
                return false;
            }

            TurnOrder = Shuffle();

            RoundNumber = 1;
            CurrentTurn = TurnOrder.First().Value;

            IsStarted = true;
            return true;
        }

        private Dictionary<string, Player> Shuffle()
        {
            return Players.OrderBy( x => random.Next() ).ToDictionary( item => item.Key, item => item.Value );
        }
    }
}
