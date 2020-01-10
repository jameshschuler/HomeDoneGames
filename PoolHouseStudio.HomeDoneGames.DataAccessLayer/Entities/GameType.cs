using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities
{
    [Table("GameType")]
    public class GameType : BaseEntity
    {
        [Key]
        public int GameTypeID { get; set; }
        public string GameName { get; set; }
    }
}
