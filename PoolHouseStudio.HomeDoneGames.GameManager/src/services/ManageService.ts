import { HubConnectionBuilder } from "@microsoft/signalr";
import APIResponse from "../models/APIResponse";
import GameType from "../models/GameType";
import instance from "./AxiosConfig";

export interface ManageService {
  getGameTypes: () => any;
  connectToHub: () => any;
}

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_HUB_URL_DEV
    : process.env.REACT_APP_HUB_URL_PROD;

const connectToHub = async () => {
  console.log("connect");
  let connection = new HubConnectionBuilder().withUrl(baseUrl!).build();
  // TODO:
  try {
    const response = await connection.start();
    console.log("response", response);
    const r = await connection.invoke("SendMessage", "test", "test1");
    console.log(r);
  } catch (err) {
    console.log({ ...err });
  }
};

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

export default {
  getGameTypes,
  connectToHub
} as ManageService;
