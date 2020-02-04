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
        Task<Room> GetRoom( string roomCode );
        Task<ValidateRoomResponse> ValidateRoom(string roomCode);
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

            if(!gameType.IsActive)
            {
                throw new NotFoundException( "Invalid Game Type", $"Game Type is not available at the moment. Please try again later!" );
            }

            // TODO: ensure uniqueness among game type and room code
            var roomCode = GenerateRoomCode();

            var room = new Room
            {
                GameType = gameType,
                RoomCode = roomCode,
                ExpireDate = DateTime.Now.AddMinutes(30) // TODO:
            };

            await _roomRepository.Add(room);

            return new CreateRoomResponse
            {
                ExpireDate = room.ExpireDate,
                GameName = room.GameType.GameName,
                GameTypeID = room.GameType.GameTypeID,
                RoomCode = room.RoomCode,
                RoomID = room.RoomID
            };
        }

        public async Task<Room> GetRoom( string roomCode )
        {
            return await _roomRepository.FirstOrDefault( e => e.RoomCode == roomCode );
        }

        public async Task<ValidateRoomResponse> ValidateRoom(string roomCode)
        {
            var room = await _roomRepository.FirstOrDefault(e => e.RoomCode == roomCode);
            if (room == null)
            {
                return new ValidateRoomResponse
                {
                    IsValid = false,
                    Message = "Room Code is Invalid!"
                };
            }

            if (DateTime.Now > room.ExpireDate)
            {
                return new ValidateRoomResponse
                {
                    IsExpired = true,
                    IsValid = true,
                    Message = "Room Code has expired!"
                };
            }

            return new ValidateRoomResponse
            {
                IsValid = true
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
