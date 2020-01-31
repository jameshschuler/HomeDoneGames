import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_HUB_URL_DEV
    : process.env.REACT_APP_HUB_URL_PROD;

let connection: HubConnection;

const connectToHub = async (): Promise<boolean> => {
  if (!connection) {
    try {
      connection = new HubConnectionBuilder().withUrl(baseUrl!).build();
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

export default {
  connectToHub,
  getConnection
};
