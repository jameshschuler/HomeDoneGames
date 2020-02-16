using PoolHouseStudio.HomeDoneGames.Common.Models;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class CreateRoomResponse
    {
        public string RoomCode { get; set; }
        public Player Player { get; set; }
    }
}
