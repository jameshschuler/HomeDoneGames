import ActionType from "../../models/enums/ActionType";
import HubMethod from "../../models/enums/HubMethod";
import { getConnection } from "../../services/HubService";

export const signalRMiddleware = (store: any) => (next: any) => async (
  action: any
) => {
  const { getState, dispatch } = store;

  const handleSuccessResponse = (response: any) => {
    console.log("response", response);
    switch (response.method) {
      case HubMethod.GenerateRoomCode:
        console.log(response.data);
    }
  };

  const handleErrorResponse = (response: any) => {
    console.log("response", response);
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
