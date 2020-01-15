import { Grid, List, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import gameTypeService, { GameType } from "../../services/gameTypeService";
import ListItemLink from "../ListItemLink";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: "2rem",
      textAlign: "center"
    }
  })
);

interface GameTypeSelectProps {}

const GameTypeSelect: React.FC<GameTypeSelectProps> = () => {
  const classes = useStyles();

  const [gameTypes, setGameTypes] = useState<GameType[]>([]);

  // TODO: this should probably just be stored in redux store
  const getGameTypes = async () => {
    const response = await gameTypeService.getGameTypes();
    setGameTypes(response);
  };

  const formatGameNameUrl = (gameName: string) => {
    return gameName.replace(/\s+/g, "").toLowerCase();
  };

  useEffect(() => {
    getGameTypes();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      justify="center"
      alignItems="center"
      direction="row-reverse"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8}>
        <Typography gutterBottom variant="h2" className={classes.title}>
          Select Game Type
        </Typography>
        <List component="nav" id="game-type-list">
          {gameTypes.map((gameType: GameType, index: number) => {
            return (
              <ListItemLink
                to={`/select-game/${formatGameNameUrl(gameType.gameName)}`}
                primary={gameType.gameName}
                key={index}
              />
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default GameTypeSelect;
