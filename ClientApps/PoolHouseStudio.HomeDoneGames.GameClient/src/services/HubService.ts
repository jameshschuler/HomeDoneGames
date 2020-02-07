import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import HubMethods from "../models/HubMethods";
import { IJoinRoomRequest } from "../models/JoinRoomRequest";

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

const joinRoom = async (request: IJoinRoomRequest) => {
  try {
    await connection.invoke(HubMethods.JoinRoomAsClient, request);
  } catch (err) {
    console.log({ ...err });
  }
};

export default {
  connectToHub,
  getConnection,
  joinRoom
};
