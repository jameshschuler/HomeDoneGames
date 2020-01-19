import { combineReducers } from "redux";
import gameStateReducer, { GameState } from "./GameStateReducer";

export interface RootState {
  gameState: GameState;
}

const rootReducer = combineReducers({
  gameState: gameStateReducer
});

export default rootReducer;
