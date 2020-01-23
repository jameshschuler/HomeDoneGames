import Action from "../../models/Action";
import ActionType from "../../models/enums/ActionType";

export interface ManageState {
  roomCode: string;
}

const initialState: ManageState = {
  roomCode: ""
};

const managerReducer = (state: ManageState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FetchRoomCode:
      return {
        ...state,
        roomCode: action.payload.roomCode
      };
    default:
      return state;
  }
};

export default managerReducer;
