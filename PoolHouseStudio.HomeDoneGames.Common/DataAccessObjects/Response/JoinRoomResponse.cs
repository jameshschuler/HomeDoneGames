using PoolHouseStudio.HomeDoneGames.Common.Models;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class JoinRoomResponse
    {
        public string Description { get; set; }
        public string GameName { get; set; }
        public string GroupName { get; set; }
        public Player Me { get; set; }
        public int MinPlayers { get; set; }
        public string RoomCode { get; set; }
    }
}
