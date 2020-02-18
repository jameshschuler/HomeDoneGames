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
        public int CurrentRoundNumber { get; private set; }
        public Dictionary<string, Player> TurnOrder { get; private set; }
        public GameData GameData { get; private set; }

        public bool StartGame()
        {
            if ( IsStarted )
            {
                return false;
            }

            TurnOrder = Shuffle();

            CurrentRoundNumber = 1;
            CurrentTurn = TurnOrder.First().Value;

            var round = new RoundData
            {
                RoundNumber = 1
            };

            GameData = new GameData()
            {
                Rounds = new List<RoundData> { round }
            };
            
            IsStarted = true;
            return true;
        }

        private Dictionary<string, Player> Shuffle()
        {
            return Players.OrderBy( x => random.Next() ).ToDictionary( item => item.Key, item => item.Value );
        }
    }
}
