using System;
using System.Collections.Generic;
using System.Text;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Request
{
    public class ValidateRoomResponse
    {
        public bool IsExpired { get; set; }
        public bool IsValid { get; set; }
        public string Message { get; set; }
    }
}
