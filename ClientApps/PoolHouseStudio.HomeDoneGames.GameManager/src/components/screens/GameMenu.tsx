import { Button, Grid, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import GameType from "../../models/GameType";
import { RootState } from "../../store/reducers/RootReducer";

interface MatchParams {
  gameTypeID: string;
}

interface GameMenuProps extends RouteComponentProps<MatchParams> {
  gameTypes: GameType[];
}

const GameMenu: React.FC<GameMenuProps> = ({ gameTypes, match }) => {
  const gameTypeID: number = parseInt(match.params.gameTypeID);
  const selectedGameType: GameType | undefined = gameTypes.find(
    (gameType: GameType) => {
      return gameType.gameTypeID === gameTypeID;
    }
  );

  const selectMenuOption = (gameTypeID: number | undefined) => {
    // <Link to={`/play/${selectedGameType?.gameTypeID}/lobby`}>
    //             </Link>
  };

  return (
    <>
      <Grid container alignItems="center" justify="center" spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className="paper">
            <h1 className="title">{selectedGameType?.gameName}</h1>
            <div className="menu">
              <Button
                size="large"
                variant="outlined"
                onClick={() => selectMenuOption(selectedGameType?.gameTypeID)}
              >
                Play
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => selectMenuOption(selectedGameType?.gameTypeID)}
              >
                About
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    gameTypes: state.dataStore.gameTypes
  };
};

export default connect(mapStateToProps)(GameMenu);
