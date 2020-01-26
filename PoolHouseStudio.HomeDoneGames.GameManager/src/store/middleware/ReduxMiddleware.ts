import ActionType from "../../models/enums/ActionType";
import GameStateEnum from "../../models/enums/GameState";
import HubMethod from "../../models/enums/HubMethod";
import { HubResponse } from "../../models/HubResponse";
import { getConnection } from "../../services/HubService";

export const signalRMiddleware = (store: any) => (next: any) => async (
  action: any
) => {
  const { getState, dispatch } = store;

  const handleSuccessResponse = (response: HubResponse) => {
    dispatch({ type: ActionType.Success });

    switch (response.method) {
      case HubMethod.GenerateRoomCode:
        dispatch({
          type: ActionType.GeneratedRoomCode,
          payload: {
            room: response.data
          }
        });
        dispatch({
          type: ActionType.UpdateState,
          payload: { gameState: GameStateEnum.Lobby }
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

  switch (action.type) {
    case ActionType.Connected:
      let connection = getConnection();

      // Register handlers
      if (connection) {
        connection.on("SendSuccessResponse", handleSuccessResponse);
        connection.on("SendErrorResponse", handleErrorResponse);
        // TODO: handle connection disconnect
      }
      break;
  }

  return next(action);
};
