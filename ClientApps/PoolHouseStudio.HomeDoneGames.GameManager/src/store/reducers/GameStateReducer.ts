import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";
import GameType from "../../models/GameType";

export interface GameState {
  selectedGameType?: GameType;
}

const initialState: GameState = {
  selectedGameType: undefined
};

const gameStateReducer = (state: GameState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.SetSelectedGameType:
      return {
        ...state,
        selectedGameType: action.payload.gameType
      };
    default:
      return state;
  }
};

export default gameStateReducer;
