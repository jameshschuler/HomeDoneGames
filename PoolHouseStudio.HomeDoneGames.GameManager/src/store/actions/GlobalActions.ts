import ActionType from "../../models/enums/ActionType";
import { healthcheck } from "../../services/HealthcheckService";

export const callHealthcheck = () => async (dispatch: any, getState: any) => {
  const response = await healthcheck();

  if (response && response.isHealthy) {
    dispatch({
      type: ActionType.Healthcheck,
      payload: {
        isHealthy: response.isHealthy
      }
    });
  } else {
    dispatch({
      type: ActionType.Error,
      payload: {
        error: {
          title: response.title,
          message: response.message
        }
      }
    });
  }
};
