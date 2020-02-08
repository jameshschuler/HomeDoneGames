using PoolHouseStudio.HomeDoneGames.Common.Models;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class CreateGameResponse
    {
        public GameManager GameManager { get; set; }
        public string GameName { get; set; }
        public int GameTypeID { get; set; }
        public string RoomCode { get; set; }
    }
}
