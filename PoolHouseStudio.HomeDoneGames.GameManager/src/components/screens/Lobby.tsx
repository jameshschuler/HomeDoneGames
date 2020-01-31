import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import GameType from "../../models/GameType";
import {
  connectToHub,
  generateRoomCode
} from "../../store/actions/ManageActions";
import { RootState } from "../../store/reducers/RootReducer";
import SimpleLoader from "../SimpleLoader";

interface ILobbyProps {
  connectToHub: () => any;
  generateRoomCode: (gameTypeID: number) => any;
  error: any;
  loading: boolean;
  selectedGame?: GameType;
}
// TODO:
// If no room and loading then show "Generating ROom Code..."
// If room and not loading show "WAiting for Players..."
const Lobby: React.FC<ILobbyProps> = ({
  connectToHub,
  generateRoomCode,
  error,
  loading,
  selectedGame
}) => {
  useEffect(() => {
    // TODO: send request to get room code
    doStuff();
  }, []);

  const doStuff = async () => {
    await connectToHub();
    if (!error) {
      await generateRoomCode(selectedGame?.gameTypeID!);

      // TODO: what to do in case of error? redirect somewhere?
    }
  };

  return (
    <>
      <Grid container alignItems="center" justify="center" spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className="paper">
            {loading ? (
              <SimpleLoader text="Generating Room Code..." />
            ) : (
              <>
                <Typography variant="h2" align="center">
                  Waiting for Players...
                </Typography>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.global.error,
    loading: state.global.loading,
    selectedGame: state.gameState.selectedGameType
  };
};

export default connect(mapStateToProps, { connectToHub, generateRoomCode })(
  Lobby
);
