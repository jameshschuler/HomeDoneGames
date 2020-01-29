import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GameType from "../../models/GameType";
import { getGameTypes } from "../../store/actions/DataStoreActions";
import { RootState } from "../../store/reducers/RootReducer";
import SimpleLoader from "../SimpleLoader";

interface ISelectGameProps {
  gameTypes: GameType[];
  getGameTypes: () => any;
  loading: boolean;
  selectGameType: (gameType: GameType) => any;
}

const SelectGame: React.FC<ISelectGameProps> = ({
  gameTypes,
  getGameTypes,
  loading,
  selectGameType
}) => {
  useEffect(() => {
    getGameTypes();
  }, []);

  return (
    <>
      <Grid container alignItems="center" justify="center" spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className="paper">
            {loading ? (
              <SimpleLoader />
            ) : (
              <>
                <h1 className="title">Select a Game</h1>
                <div className="menu">
                  {gameTypes &&
                    gameTypes.length > 0 &&
                    gameTypes.map((gameType: GameType, index: number) => {
                      return (
                        <Button
                          key={index}
                          size="large"
                          variant="outlined"
                          //onClick={() => selectGameType(gameType)}
                        >
                          <Link to={`/play/${gameType.gameTypeID}/menu`}>
                            {gameType.gameName}
                          </Link>
                        </Button>
                      );
                    })}
                </div>
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
    gameTypes: state.dataStore.gameTypes,
    loading: state.global.loading
  };
};

export default connect(mapStateToProps, { getGameTypes })(SelectGame);
