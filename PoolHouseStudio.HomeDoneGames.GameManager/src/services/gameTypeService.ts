import axios from "axios";

export interface GameTypeService {
  getGameTypes: () => any;
}

interface GameType {
  gameTypeID: number;
  gameName: string;
}

const baseUrl = "https://localhost:44320/"; // TODO:

const getGameTypes = async () => {
  try {
    const response = await axios.get(`${baseUrl}api/gameType`);
    return response.data as GameType[];
  } catch (err) {
    // TODO: handle errors
    console.log(err);
  }
};

const formatGameNameUrl = (gameName: string) => {
  return gameName.replace(/\s+/g, "").toLowerCase();
};

export default {
  getGameTypes
} as GameTypeService;
