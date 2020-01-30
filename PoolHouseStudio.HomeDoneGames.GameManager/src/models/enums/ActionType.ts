enum ActionType {
  // Global
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",
  Healthcheck = "HEALTHCHECK",

  // Game Type
  SetSelectedGameType = "SET_SELECTED_GAME_TYPE",
  FetchGameTypes = "FETCH_GAME_TYPES",

  // Hub
  Connected = "CONNECTED",
  JoinGroup = "JOIN_GROUP",
  GenerateRoomCode = "GENERATE_ROOM_CODE",
  GeneratedRoomCode = "GENERATED_ROOM_CODE"
}

export default ActionType;
