import { ActionType } from "../../models/enums/ActionType";
import { JoinRoomRequest } from "../../models/request/JoinRoomRequest";
import { StartGameRequest } from "../../models/request/StartGameRequest";
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

export const createRoom = (playerName: string) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ActionType.Loading });

  // TODO: get gametypeid from store
  await HubService.createRoom({ gameTypeID: 1, playerName });
};

export const joinRoom = (request: JoinRoomRequest) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ActionType.Loading });
  await HubService.joinRoom(request);
};

export const startGame = (roomCode: string) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ActionType.Loading });
  await HubService.startGame(new StartGameRequest(roomCode));
};
