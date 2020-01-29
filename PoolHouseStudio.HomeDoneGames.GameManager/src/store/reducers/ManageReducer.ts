import { IAction } from "../../models/Action";
import ActionType from "../../models/enums/ActionType";

export interface ManageState {
  room: any;
}

const initialState: ManageState = {
  room: undefined
};

const managerReducer = (state: ManageState = initialState, action: IAction) => {
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

export default managerReducer;
