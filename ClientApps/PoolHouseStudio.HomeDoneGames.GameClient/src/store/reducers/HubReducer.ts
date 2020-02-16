import { IAction } from "../../models/Action";
import { ActionType } from "../../models/enums/ActionType";
import { IGameData } from "../../models/GameData";
import { Player } from "../../models/Player";

export interface IHubState {
  gameData?: IGameData;
  me?: Player;
  roomCode?: string;
  players: Player[];
}

const initialState: IHubState = {
  gameData: undefined,
  me: undefined,
  roomCode: undefined,
  players: []
};

const hubReducer = (state: IHubState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.JoinRoom:
      return {
        ...state,
        me: action.payload.player,
        roomCode: action.payload.roomCode
      };
    case ActionType.PlayersUpdated:
      return {
        ...state,
        players: action.payload.players
      };
    case ActionType.RoomCreated:
      return {
        ...state,
        me: action.payload.player,
        roomCode: action.payload.roomCode
      };
    case ActionType.GameStarted:
      console.log(action.payload.gameData);
      let gameData = {
        ...state.gameData,
        ...action.payload.gameData
      };
      return {
        ...state,
        gameData
      };
    default:
      return state;
  }
};

export default hubReducer;
