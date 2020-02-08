using PoolHouseStudio.HomeDoneGames.Common.Models;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class CreateGameResponse
    {
        public int GameTypeID { get; set; }
        public string ManagerGroupName { get; set; }
        public string RoomCode { get; set; }
    }
}
