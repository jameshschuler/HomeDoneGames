using Newtonsoft.Json;

namespace PoolHouseStudio.HomeDoneGames.Common
{
    public class ErrorDetails
    {
        public string Message       { get; set; }
        public string Description   { get; set; }
        public int    StatusCode    { get; set; }


        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
