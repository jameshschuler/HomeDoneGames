import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";

export interface GlobalState {
  isHealthy: boolean;
  loading: boolean;
  error: any;
}

const initialState: GlobalState = {
  error: undefined,
  isHealthy: false,
  loading: false
};

const globalReducer = (state: GlobalState = initialState, action: IAction) => {
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
    case ActionType.Healthcheck:
      return {
        ...state,
        isHealthy: action.payload.isHealthy
      };
    default:
      return state;
  }
};

export default globalReducer;
