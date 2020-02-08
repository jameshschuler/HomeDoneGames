import { combineReducers } from "redux";
import dataStoreReducer, { IDataStoreState } from "./DataStoreReducer";
import gameStateReducer, { IGameState } from "./GameStateReducer";
import globalReducer, { IGlobalState } from "./GlobalReducer";
import hubReducer, { IHubState } from "./HubReducer";

export interface RootState {
  dataStore: IDataStoreState;
  gameState: IGameState;
  global: IGlobalState;
  hub: IHubState;
}

const rootReducer = combineReducers({
  dataStore: dataStoreReducer,
  gameState: gameStateReducer,
  global: globalReducer,
  hub: hubReducer
});

export default rootReducer;
