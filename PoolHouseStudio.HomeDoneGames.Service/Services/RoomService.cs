using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Service.Services
{
    public interface IRoomService
    {
        Task<CreateRoomResponse> CreateRoom(int gameTypeID);
    }

    public class RoomService : IRoomService
    {
        private readonly IGameTypeRepository _gameTypeRepository;
        private readonly IRoomRepository _roomRepository;

        public RoomService(IGameTypeRepository gameTypeRepository,
            IRoomRepository roomRepository)
        {
            _gameTypeRepository = gameTypeRepository;
            _roomRepository = roomRepository;
        }

        public async Task<CreateRoomResponse> CreateRoom(int gameTypeID)
        {
            var gameType = await _gameTypeRepository.GetById(gameTypeID);
            if (gameType == null)
            {
                // TODO: throw or return not found error?
            }

            var roomCode = GenerateRoomCode();
            // make sure it's unique among game type and room code
            // save in table
            // send back response

            throw new NotImplementedException();
        }

       
        public string GenerateRoomCode(int length = 4)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
