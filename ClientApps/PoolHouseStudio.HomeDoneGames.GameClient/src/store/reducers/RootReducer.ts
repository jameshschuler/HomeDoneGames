import { combineReducers } from "redux";
import globalReducer, { IGlobalState } from "./GlobalReducer";
import hubReducer, { IHubState } from "./HubReducer";

export interface IRootState {
  global: IGlobalState;
  hub: IHubState;
}

export const rootReducer = combineReducers({
  global: globalReducer,
  hub: hubReducer
});
