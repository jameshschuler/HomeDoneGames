using PoolHouseStudio.HomeDoneGames.Common;
using PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Entities;
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
                throw new NotFoundException("Invalid Game Type", $"Game Type ID {gameTypeID} is not valid.");
            }

            // TODO: ensure uniqueness among game type and room code
            var roomCode = GenerateRoomCode();

            var room = new Room
            {
                GameType = gameType,
                RoomCode = roomCode,
                ExpireDate = DateTime.Now.AddMinutes(30)
            };

            await _roomRepository.Add(room);

            return new CreateRoomResponse
            {
                ExpireDate = room.ExpireDate,
                GameName = room.GameType.GameName,
                GameTypeID = room.GameType.GameTypeID,
                RoomCode = room.RoomCode
            };
        }

        private string GenerateRoomCode(int length = 4)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
