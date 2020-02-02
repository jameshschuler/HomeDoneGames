import { ActionType } from "../../models/enums/ActionType";
import HubMethods from "../../models/HubMethods";
import { IHubResponse } from "../../models/HubResponse";
import { IPlayerJoined } from "../../models/response/PlayerJoinedResponse";
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

  const handlePlayerJoined = (response: IPlayerJoined) => {
    dispatch({
      type: ActionType.PlayerJoined,
      payload: {
        players: response.players
      }
    });
  };

  switch (action.type) {
    case ActionType.Connected:
      let connection = HubService.getConnection();

      // Register handlers
      if (connection) {
        connection.on("SendSuccessResponse", handleSuccessResponse);
        connection.on("SendErrorResponse", handleErrorResponse);
        connection.on(HubMethods.PlayerJoined, handlePlayerJoined);
        // TODO: handle connection disconnect
      }
      break;
  }

  return next(action);
};
