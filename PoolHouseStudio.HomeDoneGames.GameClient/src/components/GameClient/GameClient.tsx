import { Grid } from "@material-ui/core";
import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect } from "react";
import { match, Route } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import Lobby from "./Lobby";
import Navbar from "./Navbar";

interface GameClientProps {
  match: match;
}

const GameClient: React.FC<GameClientProps> = ({ match }) => {
  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    let connection = new HubConnectionBuilder()
      .withUrl("http://localhost:60284/gamehub")
      .build();

    console.log(connection);
    try {
      const response = await connection.start();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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
