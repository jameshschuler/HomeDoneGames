import axios from "axios";
import APIResponse from "../models/APIResponse";
import GameType from "../models/GameType";

export interface GameTypeService {
  getGameTypes: () => any;
}

const baseUrl = "https://localhost:44320/"; // TODO: move to react environment variable

const getGameTypes = async (): Promise<GameType[] | APIResponse> => {
  try {
    const response = await axios.get(`${baseUrl}api/gameType`);
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

const formatGameNameUrl = (gameName: string) => {
  return gameName.replace(/\s+/g, "").toLowerCase();
};

export default {
  getGameTypes
} as GameTypeService;
