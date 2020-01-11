using Microsoft.EntityFrameworkCore;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options)
            : base(options)
        { }

        public virtual DbSet<GameType>  GameTypes { get; set; }
        public virtual DbSet<Room>      Rooms     { get; set; }
    }
}
