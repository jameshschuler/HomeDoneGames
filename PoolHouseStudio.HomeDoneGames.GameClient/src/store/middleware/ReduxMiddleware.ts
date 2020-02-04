import { ActionType } from "../../models/enums/ActionType";
import HubMethods from "../../models/HubMethods";
import { IHubResponse } from "../../models/HubResponse";
import { IPlayersUpdatedResponse } from "../../models/response/PlayersUpdatedResponse";
import HubService from "../../services/HubService";

export const signalRMiddleware = (store: any) => (next: any) => async (
  action: any
) => {
  const { getState, dispatch } = store;

  const handleSuccessResponse = (response: IHubResponse) => {
    dispatch({ type: ActionType.Success });

    console.log(response);
    switch (response.method) {
      case HubMethods.JoinRoomAsClient:
        dispatch({
          type: ActionType.JoinRoom,
          payload: {
            player: response.data
          }
        });
        break;
    }
  };

  const handleErrorResponse = (response: IHubResponse) => {
    dispatch({
      type: ActionType.Error,
      payload: {
        error: response
      }
    });
  };

  const handlePlayersUpdated = (response: IPlayersUpdatedResponse) => {
    dispatch({
      type: ActionType.PlayerJoined,
      payload: {
        players: response.players
      }
    });
  };

  const handlePlayerDisconnected = (response: any) => {
    console.log("handlePlayerDisconnected", response);
  };

  switch (action.type) {
    case ActionType.Connected:
      let connection = HubService.getConnection();

      // Register handlers
      if (connection) {
        connection.on("SendSuccessResponseToCaller", handleSuccessResponse);
        connection.on("SendErrorResponseToCaller", handleErrorResponse);
        connection.on(HubMethods.PlayerJoined, handlePlayersUpdated);
        connection.on("disconnected", handlePlayerDisconnected);
        // TODO: handle connection disconnect
      }
      break;
  }

  return next(action);
};
