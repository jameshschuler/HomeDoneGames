import ActionType from "../../models/enums/ActionType";
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
          message: "Unable to connect to game server. Please try again!"
        }
      }
    });
  }
};

export const generateRoomCode = (gameTypeID: number) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ActionType.Loading });

  await HubService.generateRoomCode(gameTypeID);
  dispatch({ type: ActionType.GenerateRoomCode });
};
