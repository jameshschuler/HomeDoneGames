import { Player } from "../Player";

export class StartGameResponse {
  public currentTurn?: Player;
  public IsStarted: boolean = false;
  public roundNumber: number = 1;
  public turnOrder?: Record<string, Player>;
}
