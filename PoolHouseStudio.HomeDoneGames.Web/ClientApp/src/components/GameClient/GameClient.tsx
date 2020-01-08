import { Grid } from "@material-ui/core";
import React from "react";
import JoinRoom from "./JoinRoom";
import Navbar from "./Navbar";

const GameClient: React.FC = () => {
  return (
    <div className="game-client">
      <Navbar />
      <Grid
        container
        spacing={0}
        direction="row-reverse"
        style={{ minHeight: "100vh" }}
      >
        <JoinRoom />
      </Grid>
    </div>
  );
};

export default GameClient;
