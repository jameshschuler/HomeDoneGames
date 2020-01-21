import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import GameType from "../../models/GameType";
import Loader from "../Loader";

interface GameTypeSelectProps {
  gameTypes: GameType[];
  loading: boolean;
  selectGameType: (gameType: GameType) => any;
}

const GameTypeSelect: React.FC<GameTypeSelectProps> = ({
  gameTypes,
  loading,
  selectGameType
}) => {
  return (
    <Grid container alignItems="center" justify="center" spacing={0}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} className="paper">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1 className="title">Select a Game</h1>
              <div id="game-types">
                {gameTypes &&
                  gameTypes.map((gameType: GameType, index: number) => {
                    return (
                      <Button
                        key={index}
                        size="large"
                        variant="outlined"
                        onClick={() => selectGameType(gameType)}
                      >
                        {gameType.gameName}
                      </Button>
                    );
                  })}
              </div>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameTypeSelect;
