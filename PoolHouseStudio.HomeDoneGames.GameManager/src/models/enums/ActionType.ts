enum ActionType {
  // Global
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",
  Healthcheck = "HEALTHCHECK",

  UpdateState = "UPDATE_STATE",

  // Game Type
  SetGameType = "SET_GAME_TYPE",
  FetchGameTypes = "FETCH_GAME_TYPES",

  // Hub
  Connected = "CONNECTED",
  JoinGroup = "JOIN_GROUP",
  GenerateRoomCode = "GENERATE_ROOM_CODE",
  GeneratedRoomCode = "GENERATED_ROOM_CODE"
}

export default ActionType;
