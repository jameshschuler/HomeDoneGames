export interface Player {
  connectionId: string;
  groupName: string;
  name: string;
  roomCode: string;
  isFirstPlayer: boolean;
  score: number;
  lives: number;
}
