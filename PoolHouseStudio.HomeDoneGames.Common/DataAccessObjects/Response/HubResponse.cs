using System;
using System.Collections.Generic;
using System.Text;

namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public abstract class HubResponse
    {
        public string Message { get; set; }
        public string Method { get; set; }
        public string Title { get; set; }
    }
}
