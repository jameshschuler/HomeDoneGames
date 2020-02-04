using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities
{
    public class GameType : BaseEntity
    {
        public GameType()
        {
            Rooms = new List<Room>();
        }

        public string Description { get; set; }
        [Key]
        public int GameTypeID { get; set; }
        public string GameName { get; set; }
        public bool IsActive { get; set; }
        public int MinPlayers { get; set; }
        public int MaxPlayers { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }
    }
}
