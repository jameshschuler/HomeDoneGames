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
            gameData: response.data
          }
        });
        break;
      case HubMethods.PlayersUpdated:
        const { players } = response.data as IPlayersUpdatedResponse;
        console.log(players);
        dispatch({
          type: ActionType.PlayersUpdated,
          payload: {
            players
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

  const handlePlayerDisconnected = (response: any) => {
    console.log("handlePlayerDisconnected", response);
  };

  switch (action.type) {
    case ActionType.Connected:
      let connection = HubService.getConnection();

      // Register handlers
      if (connection) {
        connection.on("SendSuccessResponse", handleSuccessResponse);
        connection.on("SendErrorResponse", handleErrorResponse);
        // TODO: handle connection disconnect and reconnect
        // https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-3.1#reconnect-clients
        connection.on("disconnected", handlePlayerDisconnected);
      }
      break;
  }

  return next(action);
};
