import { IAction } from "../../models/Action";
import { ActionType } from "../../models/enums/ActionType";
import { IError } from "../../models/Error";

export interface IGlobalState {
  loading: boolean;
  error: IError | null;
}

const initialState: IGlobalState = {
  error: null,
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
        error: null
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
