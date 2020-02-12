import { Button, Grid, Paper, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IPlayer } from "../../models/Player";
import { IRootState } from "../../store/reducers/RootReducer";

interface ILobbyProps {
  history: any;
  players: IPlayer[];
  isFirstPlayer: boolean | undefined;
}

const Lobby: React.FC<ILobbyProps> = ({ history, isFirstPlayer, players }) => {
  useEffect(() => {
    if (players.length === 0) {
      // history.push("/join");
    }
  }, []);

  return (
    <Grid item xs={12} sm={8} id="join-room">
      <Paper className="paper" elevation={0}>
        <Typography align="center" variant="h4">
          Waiting for Players...
        </Typography>
        <div id="players">
          {players &&
            players.map((player: IPlayer, index: number) => {
              return (
                <Chip key={index} label={player.name} variant="outlined" />
              );
            })}
        </div>
        {isFirstPlayer && (
          <div id="actions">
            <Button
              id="start-game-button"
              size="large"
              variant="contained"
              color="primary"
            >
              Start Game!
            </Button>
          </div>
        )}
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    isFirstPlayer: state.hub.gameData?.me.isFirstPlayer,
    players: state.hub.players
  };
};

export default connect(mapStateToProps)(Lobby);
