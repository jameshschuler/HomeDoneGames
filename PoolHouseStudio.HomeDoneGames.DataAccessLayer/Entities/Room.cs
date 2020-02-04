using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities
{
    public class Room : BaseEntity
    {
        public DateTime ExpireDate  { get; set; }
        public int      GameTypeID { get; set; }
        public string   RoomCode    { get; set; }
        [Key]
        public int      RoomID      { get; set; }

        public virtual GameType GameType { get; set; }
    }
}
