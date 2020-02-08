import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";
import { IGameData } from "../../models/GameData";
import { IPlayer } from "../../models/Player";

export interface IHubState {
  game: IGameData | null;
  players: IPlayer[];
}

const initialState: IHubState = {
  game: null,
  players: []
};

const hubReducer = (state: IHubState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.GeneratedRoomCode:
      return {
        ...state,
        game: action.payload.game
      };
    case ActionType.PlayersUpdated:
      return {
        ...state,
        players: action.payload.players
      };
    default:
      return state;
  }
};

export default hubReducer;
