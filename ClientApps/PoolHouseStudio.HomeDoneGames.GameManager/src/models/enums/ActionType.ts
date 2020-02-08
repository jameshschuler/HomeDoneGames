enum ActionType {
  // Global
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",

  // Game Type
  SetSelectedGame = "SET_SELECTED_GAME",
  FetchGameTypes = "FETCH_GAME_TYPES",

  // Hub
  Connected = "CONNECTED",
  JoinGroup = "JOIN_GROUP",
  GenerateRoomCode = "GENERATE_ROOM_CODE",
  GeneratedRoomCode = "GENERATED_ROOM_CODE",
  PlayersUpdated = "PLAYERS_UPDATED"
}

export default ActionType;
