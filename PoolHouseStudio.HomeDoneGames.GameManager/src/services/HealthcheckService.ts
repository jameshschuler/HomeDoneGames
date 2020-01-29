import { instance } from "./AxiosConfig";

export const healthcheck = async (): Promise<any> => {
  try {
    await instance.get(`/healthcheck`);
    return {
      isHealthy: true
    };
  } catch (err) {
    return {
      isHealthy: false,
      title: "Connection Error",
      message: "Unable to connect to game server. Please try again soon!"
    };
  }
};
