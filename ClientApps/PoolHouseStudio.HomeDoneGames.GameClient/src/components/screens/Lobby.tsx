import { Button, Grid, Paper, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Player } from "../../models/Player";
import { startGame } from "../../store/actions/HubActions";
import { IRootState } from "../../store/reducers/RootReducer";

interface ILobbyProps {
  history: any;
  isStarted: boolean | undefined;
  loading: boolean;
  me: Player | undefined;
  players: Player[];
  roomCode: string | undefined;
  startGame: (roomCode: string) => any;
}

const Lobby: React.FC<ILobbyProps> = ({
  history,
  isStarted,
  loading,
  me,
  players,
  roomCode,
  startGame
}) => {
  useEffect(() => {
    if (!me) {
      history.push("/join-room");
    }
  }, []);

  useEffect(() => {
    if (isStarted) {
      history.push("/play");
    }
  }, [isStarted]);

  return (
    <Grid item xs={12} sm={8} id="lobby">
      <Paper className="paper" elevation={0}>
        <p>{roomCode}</p>
        <Typography align="center" variant="h4">
          Waiting for Players...
        </Typography>
        <div id="players">
          {players &&
            players.map((player: Player, index: number) => {
              return (
                <Chip key={index} label={player.name} variant="outlined" />
              );
            })}
        </div>
        {me && me.isFirstPlayer && (
          <div id="actions">
            <Button
              id="start-game-button"
              size="large"
              variant="contained"
              color="primary"
              onClick={() => startGame(roomCode || "")}
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
    me: state.hub.me,
    isStarted: state.hub.gameData?.isStarted,
    loading: state.global.loading,
    players: state.hub.players,
    roomCode: state.hub.roomCode
  };
};

export default connect(mapStateToProps, { startGame })(Lobby);
