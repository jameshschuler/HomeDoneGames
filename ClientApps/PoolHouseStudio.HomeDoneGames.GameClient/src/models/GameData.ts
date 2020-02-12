import { IPlayer } from "./Player";

export interface IGameData {
  description: string;
  gameName: string;
  gameTypeID: string;
  minPlayers: number;
  me: IPlayer;
  roomCode: string;
}
