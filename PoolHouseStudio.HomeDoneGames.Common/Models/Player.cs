namespace PoolHouseStudio.HomeDoneGames.Common.Models
{
    public class Player
    {
        public string Name { get; set; }
        public string RoomCode { get; set; }
        public string GroupName { get; set; }
        public int Score { get; set; }
        public int Lives { get; set; }
        public bool IsFirstPlayer { get; set; }
    }
}
