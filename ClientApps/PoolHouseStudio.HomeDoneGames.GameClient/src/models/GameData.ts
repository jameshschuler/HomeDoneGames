import { Player } from "./Player";

export interface IGameData {
  currentTurn: Player;
  description: string;
  gameName: string;
  gameTypeID: string;
  isStarted: boolean;
  minPlayers: number;
  me: Player;
  roomCode: string;
  roundNumber: number;
  turnOrder: Record<string, Player>;
}
