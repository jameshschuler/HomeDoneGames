enum ActionType {
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",

  UpdateState = "UPDATE_STATE",

  SetGameType = "SET_GAME_TYPE",

  FetchGameTypes = "FETCH_GAME_TYPES",

  FetchRoomCode = "FETCH_ROOM_CODE",

  // Hub
  Connected = "CONNECTED",
  JoinGroup = "JOIN_GROUP",
  GenerateRoomCode = "GENERATE_ROOM_CODE"
}

export default ActionType;
