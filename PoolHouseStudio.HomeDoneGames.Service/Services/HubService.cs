using PoolHouseStudio.HomeDoneGames.Common.Models;
using System.Collections.Generic;

namespace PoolHouseStudio.HomeDoneGames.Service.Services
{
    public interface IHubService
    {
        // Add
        // Remove
        // Remove All
        // GetAll given a room code?
    }

    public class HubService : IHubService
    {
        private static Dictionary<string, Player> _players = new Dictionary<string, Player>();

        public HubService()
        {

        }
    }
}
