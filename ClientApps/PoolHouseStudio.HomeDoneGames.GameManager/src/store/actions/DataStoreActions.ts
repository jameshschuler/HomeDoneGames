import ActionType from "../../models/enums/ActionType";
import GameTypeService from "../../services/GameTypeService";

export const getGameTypes = () => async (dispatch: any, getState: any) => {
  dispatch({ type: ActionType.Loading });

  // TODO: prevent game types from reloading

  const response = await GameTypeService.getGameTypes();
  if (response === null) {
    dispatch({
      type: ActionType.Error,
      payload: {
        error: {
          title: "Connection Error",
          message: "Unable to connect to game server. Please try again later!"
        }
      }
    });
  } else {
    const payload = {
      gameTypes: response
    };

    dispatch({
      type: ActionType.FetchGameTypes,
      payload
    });
    dispatch({ type: ActionType.Success });
  }
};
