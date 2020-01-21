import { combineReducers } from "redux";
import dataStoreReducer, { DataStoreState } from "./DataStoreReducer";
import gameStateReducer, { GameState } from "./GameStateReducer";
import globalReducer, { GlobalState } from "./GlobalReducer";

export interface RootState {
  dataStore: DataStoreState;
  gameState: GameState;
  global: GlobalState;
}

const rootReducer = combineReducers({
  dataStore: dataStoreReducer,
  gameState: gameStateReducer,
  global: globalReducer
});

export default rootReducer;
