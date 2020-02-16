export class StartGameRequest {
  roomCode: string;

  public constructor(roomCode: string) {
    this.roomCode = roomCode;
  }
}
