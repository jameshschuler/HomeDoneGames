import { Button, Grid, Paper } from "@material-ui/core";
import React from "react";
import GameMenuOption from "../../models/enums/GameMenuOption";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";

interface GameMenuProps {
  goToScreen: (gameState: GameStateEnum) => any;
  selectGameMenuOption: (gameMenuOption: GameMenuOption) => any;
  gameType?: GameType;
}

const GameMenu: React.FC<GameMenuProps> = ({
  goToScreen,
  selectGameMenuOption,
  gameType
}) => {
  return (
    <>
      <div
        className="go-back-link"
        onClick={() => goToScreen(GameStateEnum.GameTypeSelect)}
      >
        <span>
          <i className="fas fa-arrow-left"></i> Back
        </span>
      </div>
      <Grid container alignItems="center" justify="center" spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className="paper">
            <h1 className="title">{gameType?.gameName}</h1>
            <div className="menu">
              <Button
                size="large"
                variant="outlined"
                onClick={() => selectGameMenuOption(GameMenuOption.Play)}
              >
                Play
              </Button>
              <Button size="large" variant="outlined">
                Settings
              </Button>
              <Button size="large" variant="outlined">
                About
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default GameMenu;
