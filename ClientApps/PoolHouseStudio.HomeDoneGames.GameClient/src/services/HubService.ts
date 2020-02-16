import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import HubMethods from "../models/HubMethods";
import { CreateRoomRequest } from "../models/request/CreateRoomRequest";
import { JoinRoomRequest } from "../models/request/JoinRoomRequest";
import { StartGameRequest } from "../models/request/StartGameRequest";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_HUB_URL_DEV
    : process.env.REACT_APP_HUB_URL_PROD;

let connection: HubConnection;

const connectToHub = async (): Promise<boolean> => {
  if (!connection) {
    try {
      connection = new HubConnectionBuilder()
        .withUrl(baseUrl!)
        .withAutomaticReconnect()
        .build();
      await connection.start();
      return true;
    } catch (err) {
      return false;
    }
  }

  return true;
};

const getConnection = () => {
  return connection;
};

const createRoom = async (request: CreateRoomRequest) => {
  try {
    console.log(request);

    await connection.invoke(HubMethods.CreateRoom, request);
  } catch (err) {
    console.log(err);
  }
};

const joinRoom = async (request: JoinRoomRequest) => {
  try {
    await connection.invoke(HubMethods.JoinRoomAsClient, request);
  } catch (err) {
    console.log({ ...err });
  }
};

const startGame = async (request: StartGameRequest) => {
  try {
    await connection.invoke(HubMethods.StartGame, request);
  } catch (err) {
    console.log({ ...err });
  }
};

export default {
  createRoom,
  connectToHub,
  getConnection,
  joinRoom,
  startGame
};
