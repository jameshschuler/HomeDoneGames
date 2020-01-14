using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities
{
    [Table("GameType")]
    public class GameType : BaseEntity
    {
        public GameType()
        {
            Rooms = new List<Room>();
        }

        [Key]
        public int GameTypeID { get; set; }
        public string GameName { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }
    }
}
