import Action from "../../models/Action";
import ActionType from "../../models/enums/ActionType";

export interface GlobalState {
  loading: boolean;
  error: any;
}

const initialState: GlobalState = {
  loading: false,
  error: undefined
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
        loading: false,
        error: undefined
      };
    case ActionType.Error:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default globalReducer;
