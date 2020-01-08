import { Grid } from "@material-ui/core";
import React from "react";
import { match, Route } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import Lobby from "./Lobby";
import Navbar from "./Navbar";

interface GameClientProps {
  match: match;
}

const GameClient: React.FC<GameClientProps> = ({ match }) => {
  return (
    <div className="game-client">
      <Navbar />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        direction="row-reverse"
        style={{ minHeight: "100vh" }}
      >
        <Route exact path="/play" component={JoinRoom} />
        <Route exact path={`${match.path}/lobby`} component={Lobby} />
      </Grid>
    </div>
  );
};

export default GameClient;
