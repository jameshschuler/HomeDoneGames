import APIResponse from "../models/APIResponse";
import GameType from "../models/GameType";
import { instance } from "./AxiosConfig";

// FIXME: Refactor
export interface GameTypeService {
  getGameTypes: () => any;
}

const getGameTypes = async (): Promise<GameType[] | APIResponse> => {
  try {
    const response = await instance.get(`/gameType`);
    return response.data as GameType[];
  } catch (err) {
    const response: APIResponse = {
      message: "Generic Error Message",
      statusCode: 500
    };
    // TODO: move error handling to axios config
    return response;
  }
};

// TODO: move to utilities
export const formatGameNameUrl = (gameName: string) => {
  return gameName.replace(/\s+/g, "").toLowerCase();
};

export default {
  getGameTypes
} as GameTypeService;
