import Action from "../../models/Action";
import ActionType from "../../models/enums/ActionType";

export interface GlobalState {
  loading: boolean;
}

const initialState: GlobalState = {
  loading: false
};

const globalReducer = (state: GlobalState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.Loading:
      return {
        ...state,
        loading: true
      };
    case ActionType.Success:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default globalReducer;
