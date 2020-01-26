import { Grid, Paper } from "@material-ui/core";
import React from "react";
import GameStateEnum from "../../models/enums/GameState";
import { Room } from "../../models/Room";

interface LobbyProps {
  goToScreen: (from: GameStateEnum, to: GameStateEnum) => any;
  room: Room;
}

const Lobby: React.FC<LobbyProps> = ({ goToScreen, room }) => {
  return (
    <>
      <div
        className="go-back-link"
        onClick={() =>
          goToScreen(GameStateEnum.Lobby, GameStateEnum.GameOptionsMenu)
        }
      >
        <span>
          <i className="fas fa-arrow-left"></i> Back
        </span>
      </div>
      <Grid container alignItems="center" justify="center" spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className="paper">
            <h1 className="title">{room.roomCode}</h1>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Lobby;
