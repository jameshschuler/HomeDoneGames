using System;
using System.Collections.Generic;
using System.Text;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities
{
    public class BaseEntity
    {
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
