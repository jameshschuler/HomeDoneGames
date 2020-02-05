import { IPlayer } from "./Player";

export interface IGameData {
  description: string;
  gameName: string;
  minPlayers: number;
  player: IPlayer;
  roomCode: string;
}
