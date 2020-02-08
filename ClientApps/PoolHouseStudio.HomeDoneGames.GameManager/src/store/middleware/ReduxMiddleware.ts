import ActionType from "../../models/enums/ActionType";
import HubMethods from "../../models/HubMethods";
import { HubResponse } from "../../models/response/HubResponse";
import { IPlayersUpdatedResponse } from "../../models/response/PlayersUpdatedResponse";
import HubService from "../../services/HubService";

export const signalRMiddleware = (store: any) => (next: any) => async (
  action: any
) => {
  const { getState, dispatch } = store;

  const handleSuccessResponse = (response: HubResponse) => {
    dispatch({ type: ActionType.Success });
    console.log(response);

    switch (response.method) {
      case HubMethods.GenerateRoomCode:
        dispatch({
          type: ActionType.GeneratedRoomCode,
          payload: {
            game: response.data
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

  const handleErrorResponse = (response: HubResponse) => {
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
        connection.on("disconnected", handlePlayerDisconnected);
      }
      break;
  }

  return next(action);
};
