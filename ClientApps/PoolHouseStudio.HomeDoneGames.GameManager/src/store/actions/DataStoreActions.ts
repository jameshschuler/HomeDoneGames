import ActionType from "../../models/enums/ActionType";
import GameTypeService from "../../services/GameTypeService";

export const getGameTypes = () => async (dispatch: any, getState: any) => {
  dispatch({ type: ActionType.Loading });

  // TODO: prevent game types from reloading

  const response = await GameTypeService.getGameTypes();
  const payload = {
    gameTypes: response
  };

  dispatch({
    type: ActionType.FetchGameTypes,
    payload
  });
  dispatch({ type: ActionType.Success });
};
