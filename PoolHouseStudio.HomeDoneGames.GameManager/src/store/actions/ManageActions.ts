import ActionType from "../../models/enums/ActionType";
import HubService from "../../services/HubService";

export const connectToHub = () => async (dispatch: any, getState: any) => {
  const isConnected = await HubService.connectToHub();
  if (isConnected) {
    await HubService.addToGroup();

    dispatch({ type: ActionType.Success });
  } else {
    dispatch({
      type: ActionType.Error,
      payload: {
        error: {
          title: "Connection Error",
          message: "Unable to connect to game server. Please try again!"
        }
      }
    });
  }
};

export const getRoomCode = () => async (dispatch: any, getState: any) => {};
