using System;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class CreateRoomResponse
    {
        public DateTime ExpireDate { get; set; }
        public string GameName { get; set; }
        public int GameTypeID { get; set; }
        public string RoomCode { get; set; }
        public int RoomID { get; set; }
    }
}
