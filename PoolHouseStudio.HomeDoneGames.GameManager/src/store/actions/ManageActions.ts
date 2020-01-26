import ActionType from "../../models/enums/ActionType";
import HubService from "../../services/HubService";

export const connectToHub = () => async (dispatch: any, getState: any) => {
  const isConnected = await HubService.connectToHub();

  if (isConnected) {
    dispatch({ type: ActionType.Connected });
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

export const joinGroup = () => async (dispatch: any, getState: any) => {
  await HubService.joinGroup();
  dispatch({ type: ActionType.JoinGroup });
};

export const generateRoomCode = (gameTypeID: number) => async (
  dispatch: any,
  getState: any
) => {
  await HubService.generateRoomCode(gameTypeID);
  dispatch({ type: ActionType.GenerateRoomCode });
};

export const play = (gameTypeID: number) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ActionType.Loading });
  const isConnected = await HubService.connectToHub();

  if (isConnected) {
    dispatch({ type: ActionType.Connected });

    await HubService.joinGroup();
    dispatch({ type: ActionType.JoinGroup });

    await HubService.generateRoomCode(gameTypeID);
    dispatch({ type: ActionType.GenerateRoomCode });
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
