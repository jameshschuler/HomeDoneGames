import { combineReducers } from "redux";
import globalReducer, { IGlobalState } from "./GlobalReducer";

export interface IRootState {
  global: IGlobalState;
}

export const rootReducer = combineReducers({
  global: globalReducer
});
