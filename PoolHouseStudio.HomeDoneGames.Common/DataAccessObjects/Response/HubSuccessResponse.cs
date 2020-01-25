namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class HubSuccessResponse
    {
        public object Data { get; set; }
        public string Message { get; set; }
        public string Method { get; set; }
        public string Title { get; set; } = "Success!";
    }
}
