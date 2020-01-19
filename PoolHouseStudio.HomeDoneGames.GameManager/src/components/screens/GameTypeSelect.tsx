import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import GameType from "../../models/GameType";

interface GameTypeSelectProps {
  selectGameType: (gameType: GameType) => any;
}

const GameTypeSelect: React.FC<GameTypeSelectProps> = ({ selectGameType }) => {
  return (
    <Grid container alignItems="center" justify="center" spacing={0}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} className="paper">
          <h1 className="title">Select a Game</h1>
          <div id="game-types">
            <Button
              size="large"
              variant="outlined"
              onClick={() =>
                selectGameType({ gameName: "game-1", gameTypeID: 1 })
              }
            >
              Game 1
            </Button>
            <Button
              size="large"
              variant="outlined"
              id="game-2"
              onClick={() =>
                selectGameType({ gameName: "game-2", gameTypeID: 2 })
              }
            >
              Game 2
            </Button>
            <Button
              size="large"
              variant="outlined"
              id="game-3"
              onClick={() =>
                selectGameType({ gameName: "game-3", gameTypeID: 3 })
              }
            >
              Game 3
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameTypeSelect;
