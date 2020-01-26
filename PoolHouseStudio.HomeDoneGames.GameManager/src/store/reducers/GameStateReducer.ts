import Action from "../../models/Action";
import ActionType from "../../models/enums/ActionType";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";

export interface GameState {
  gameStateValue: GameStateEnum;
  selectedGameType?: GameType;
}

const initialState: GameState = {
  gameStateValue: GameStateEnum.GameSelect,
  selectedGameType: undefined
};

const gameStateReducer = (state: GameState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SetGameType:
      return {
        ...state,
        gameStateValue: action.payload.gameState,
        selectedGameType: action.payload.gameType
      };
    case ActionType.UpdateState:
      return {
        ...state,
        gameStateValue: action.payload.gameState
      };
    default:
      return state;
  }
};

export default gameStateReducer;
