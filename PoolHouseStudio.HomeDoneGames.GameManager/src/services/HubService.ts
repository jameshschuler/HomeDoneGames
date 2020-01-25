import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export interface HubService {
  addToGroup: () => any;
  connectToHub: () => any;
  generateRoomCode: () => any;
}

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_HUB_URL_DEV
    : process.env.REACT_APP_HUB_URL_PROD;

let connection: HubConnection;

const connectToHub = async (): Promise<boolean> => {
  if (connection) {
    return true;
  }

  connection = new HubConnectionBuilder().withUrl(baseUrl!).build();

  try {
    await connection.start();

    // Register events?
    connection.on("SendSuccessResponse", handleSuccessResponse);
    connection.on("SendErrorResponse", handleErrorResponse);

    return true;
  } catch (err) {
    return false;
  }
};

// NOTE: should these methods be passed as parameters when connecting to the hub from the action?
// This might solve the issue below

const handleSuccessResponse = (response: any) => {
  // TODO: how can we return the response to the action?
  console.log("handleSuccessResponse", response);
};

const handleErrorResponse = (response: any) => {
  // TODO: how can we return the response to the action?
  console.log("handleErrorResponse", response);
};

const addToGroup = async () => {
  try {
    await connection.invoke("AddToManagerGroup");
  } catch (err) {
    console.log({ ...err });
  }
};

/**
 *
 */
const generateRoomCode = async (gameTypeID: number) => {
  try {
    await connection.invoke("GenerateRoomCode", gameTypeID);
  } catch (err) {
    console.log({ ...err });
  }
};

export default {
  addToGroup,
  connectToHub,
  generateRoomCode
} as HubService;
