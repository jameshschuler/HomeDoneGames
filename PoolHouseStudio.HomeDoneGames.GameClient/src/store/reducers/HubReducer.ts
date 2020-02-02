import { IAction } from "../../models/Action";
import { ActionType } from "../../models/enums/ActionType";
import { IPlayer } from "../../models/Player";

export interface IHubState {
  player: IPlayer | null;
  players: IPlayer[];
}

const initialState: IHubState = {
  player: null,
  players: []
};

const hubReducer = (state: IHubState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.JoinRoom:
      return {
        ...state,
        player: action.payload.player
      };
    case ActionType.PlayerJoined:
      return {
        ...state,
        players: action.payload.players
      };
    default:
      return state;
  }
};

export default hubReducer;
