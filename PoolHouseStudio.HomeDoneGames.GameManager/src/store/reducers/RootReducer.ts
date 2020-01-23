import { combineReducers } from "redux";
import dataStoreReducer, { DataStoreState } from "./DataStoreReducer";
import gameStateReducer, { GameState } from "./GameStateReducer";
import globalReducer, { GlobalState } from "./GlobalReducer";
import manageReducer, { ManageState } from "./ManageReducer";

export interface RootState {
  dataStore: DataStoreState;
  gameState: GameState;
  global: GlobalState;
  manage: ManageState;
}

const rootReducer = combineReducers({
  dataStore: dataStoreReducer,
  gameState: gameStateReducer,
  global: globalReducer,
  manage: manageReducer
});

export default rootReducer;
