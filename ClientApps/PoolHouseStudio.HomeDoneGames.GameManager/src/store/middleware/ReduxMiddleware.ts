import ActionType from "../../models/enums/ActionType";
import HubMethods from "../../models/HubMethods";
import { HubResponse } from "../../models/HubResponse";
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
            room: response.data
          }
        });
        break;
      case HubMethods.PlayersUpdated:
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
        connection.on("SendSuccessResponseToCaller", handleSuccessResponse);
        connection.on("SendErrorResponseToCaller", handleErrorResponse);
        connection.on("disconnected", handlePlayerDisconnected);
      }
      break;
  }

  return next(action);
};
