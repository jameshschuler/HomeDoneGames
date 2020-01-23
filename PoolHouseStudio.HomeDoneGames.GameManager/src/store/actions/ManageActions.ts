import ActionType from "../../models/enums/ActionType";
import ManageService from "../../services/ManageService";

export const getRoomCode = () => async (dispatch: any, getState: any) => {
  ManageService.connectToHub();

  dispatch({
    type: ActionType.FetchRoomCode,
    payload: {
      roomCode: ""
    }
  });
};
