import { IAction } from "../../models/Action";
import { ActionType } from "../../models/enums/ActionType";
import { Error } from "../../models/Error";

export interface IGlobalState {
  loading: boolean;
  error: Error | undefined;
}

const initialState: IGlobalState = {
  error: undefined,
  loading: false
};

const globalReducer = (state: IGlobalState = initialState, action: IAction) => {
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
