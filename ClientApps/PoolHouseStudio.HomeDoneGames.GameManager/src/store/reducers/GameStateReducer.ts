import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";
import GameType from "../../models/GameType";

export interface IGameState {
  selectedGame: GameType | null;
}

const initialState: IGameState = {
  selectedGame: null
};

const gameStateReducer = (
  state: IGameState = initialState,
  action: IAction
) => {
  switch (action.type) {
    case ActionType.SetSelectedGame:
      return {
        ...state,
        selectedGame: action.payload.selectedGame
      };
    default:
      return state;
  }
};

export default gameStateReducer;
