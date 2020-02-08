import ActionType from "../../models/enums/ActionType";
import GameType from "../../models/GameType";

export const setSelectedGame = (gameType: GameType) => {
  return {
    type: ActionType.SetSelectedGame,
    payload: {
      selectedGame: gameType
    }
  };
};
