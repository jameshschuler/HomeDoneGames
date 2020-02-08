import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IGameData } from "../../models/GameData";
import GameType from "../../models/GameType";
import { connectToHub, generateRoomCode } from "../../store/actions/HubActions";
import { RootState } from "../../store/reducers/RootReducer";
import SimpleLoader from "../SimpleLoader";

interface ILobbyProps {
  connectToHub: () => any;
  generateRoomCode: (gameTypeID: number) => any;
  error: any;
  game: IGameData | null;
  loading: boolean;
  selectedGame: GameType | null;
}

const Lobby: React.FC<ILobbyProps> = ({
  connectToHub,
  generateRoomCode,
  error,
  game,
  loading,
  selectedGame
}) => {
  useEffect(() => {
    createGame();
  }, []);

  const createGame = async () => {
    await connectToHub();
    if (!error) {
      await generateRoomCode(selectedGame?.gameTypeID!);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {loading ? (
            <SimpleLoader text="Generating Room Code..." />
          ) : (
            <>
              <div id="game-information">
                <Typography variant="h4">
                  Room Code: {game?.roomCode}
                </Typography>
                <Typography variant="h4">{game?.gameName}</Typography>
              </div>
              <Paper elevation={0} className="paper">
                <Typography variant="h1" align="center">
                  Waiting for Players...
                </Typography>
              </Paper>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.global.error,
    game: state.hub.game,
    loading: state.global.loading,
    selectedGame: state.gameState.selectedGame
  };
};

export default connect(mapStateToProps, { connectToHub, generateRoomCode })(
  Lobby
);
