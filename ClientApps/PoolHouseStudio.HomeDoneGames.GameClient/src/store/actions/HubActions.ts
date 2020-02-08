import { ActionType } from "../../models/enums/ActionType";
import { IJoinRoomRequest } from "../../models/JoinRoomRequest";
import HubService from "../../services/HubService";

export const connectToHub = () => async (dispatch: any, getState: any) => {
  dispatch({ type: ActionType.Loading });
  const isConnected = await HubService.connectToHub();

  if (isConnected) {
    dispatch({ type: ActionType.Connected });
    dispatch({ type: ActionType.Success });
  } else {
    dispatch({
      type: ActionType.Error,
      payload: {
        error: {
          title: "Connection Error",
          message: "Unable to connect to game server. Please try again later!"
        }
      }
    });
  }
};

export const joinRoom = (request: IJoinRoomRequest) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ActionType.Loading });
  await HubService.joinRoom(request);
};
