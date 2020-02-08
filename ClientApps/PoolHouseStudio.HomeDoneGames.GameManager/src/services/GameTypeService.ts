import GameType from "../models/GameType";
import { instance } from "./AxiosConfig";

const getGameTypes = async (): Promise<GameType[] | null> => {
  try {
    const response = await instance.get(`/gameType`);
    return response.data as GameType[];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default {
  getGameTypes
};
