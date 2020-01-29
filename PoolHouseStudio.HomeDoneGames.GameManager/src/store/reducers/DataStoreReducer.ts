import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";
import GameType from "../../models/GameType";

export interface DataStoreState {
  gameTypes: GameType[];
}

const initialState: DataStoreState = {
  gameTypes: []
};

const dataStoreReducer = (
  state: DataStoreState = initialState,
  action: IAction
) => {
  switch (action.type) {
    case ActionType.FetchGameTypes:
      return {
        ...state,
        gameTypes: action.payload.gameTypes
      };
    default:
      return state;
  }
};

export default dataStoreReducer;
