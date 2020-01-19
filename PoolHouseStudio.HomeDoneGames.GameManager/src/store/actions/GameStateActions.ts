import ActionType from "../../models/enums/ActionType";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";

export const setGameType = (gameType: GameType) => {
  return {
    type: ActionType.SetGameType,
    payload: {
      gameType,
      gameState: GameStateEnum.GameTypeMenu
    }
  };
};
