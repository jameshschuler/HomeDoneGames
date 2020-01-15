namespace PoolHouseStudio.HomeDoneGames.Common.DataAccessObjects.Response
{
    public class ValidateRoomResponse
    {
        public bool IsExpired { get; set; }
        public bool IsValid { get; set; }
        public string Message { get; set; }
    }
}
