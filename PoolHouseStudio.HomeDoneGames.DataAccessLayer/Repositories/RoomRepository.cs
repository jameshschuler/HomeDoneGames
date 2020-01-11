using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Repositories
{
    public interface IRoomRepository : IAsyncRepository<Room>
    {

    }

    public class RoomRepository : Repository<Room>, IRoomRepository
    {
        public RoomRepository(DataDbContext context) : base(context)
        {

        }
    }
}
