import Action from "../../models/Action";
import ActionType from "../../models/enums/ActionType";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";

export interface GameState {
  gameStateValue: GameStateEnum;
  selectedGameType?: GameType;
}

const initialState: GameState = {
  gameStateValue: GameStateEnum.GameTypeSelect,
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
        gameStateValue: action.payload,
        ...state
      };
    default:
      return state;
  }
};

export default gameStateReducer;
