using PoolHouseStudio.HomeDoneGames.Common.Exceptions;
using System.Net;

namespace PoolHouseStudio.HomeDoneGames.Common
{
    public class NotFoundException : BaseException
    {
        public NotFoundException(string message, string description) 
            : base(message, description, (int)HttpStatusCode.NotFound)
        {
        }
    }
}
