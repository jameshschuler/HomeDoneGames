using PoolHouseStudio.HomeDoneGames.Common.Models;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request
{
    public class PlayerResponseRequest
    {
        public NeverHaveIEverAnswer Answer { get; set; }
        public string ConnectionId { get; set; }
        public string GroupName { get; set; } // TODO: do we need this?
        public string RoomCode { get; set; }
        public string Statement { get; set; }
    }
}
