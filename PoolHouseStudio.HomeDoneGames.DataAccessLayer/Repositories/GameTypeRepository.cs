using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities;

namespace PoolHouseStudio.HomeDoneGames.DataAccessLayer.Repositories
{
    public interface IGameTypeRepository : IAsyncRepository<GameType>
    {
        
    }

    public class GameTypeRepository : Repository<GameType>, IGameTypeRepository
    {
        public GameTypeRepository(DataDbContext context) : base(context)
        {

        }
    }
}
