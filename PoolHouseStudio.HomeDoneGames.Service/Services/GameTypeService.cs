using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Service.Services
{
    public interface IGameTypeService
    {
        Task<IEnumerable<GameType>> GetGameTypes();
    }

    public class GameTypeService : IGameTypeService
    {
        private readonly IGameTypeRepository GameTypeRepository;

        public GameTypeService(IGameTypeRepository gameTypeRepository)
        {
            GameTypeRepository = gameTypeRepository;
        }

        public async Task<IEnumerable<GameType>> GetGameTypes()
        {
            return await GameTypeRepository.GetAll();
        }
    }
}
