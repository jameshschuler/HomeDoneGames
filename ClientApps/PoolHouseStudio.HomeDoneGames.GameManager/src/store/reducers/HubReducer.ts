import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";

export interface IHubState {
  room: any;
}

const initialState: IHubState = {
  room: undefined
};

const hubReducer = (state: IHubState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.GeneratedRoomCode:
      return {
        ...state,
        room: action.payload.room
      };
    default:
      return state;
  }
};

export default hubReducer;
