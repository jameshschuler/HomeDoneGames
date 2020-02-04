import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IPlayer } from "../../models/Player";
import { IRootState } from "../../store/reducers/RootReducer";

interface ILobbyProps {
  history: any;
  players: IPlayer[];
}

const Lobby: React.FC<ILobbyProps> = ({ history, players }) => {
  useEffect(() => {
    console.log(players);
    // if (players.length === 0) {
    //   history.push("/join");
    // }
  }, []);

  return (
    <Grid item xs={12} sm={8} id="join-room">
      <Paper className="paper" elevation={0}>
        <Typography align="center" variant="h4">
          Waiting for Players...
        </Typography>
        {players &&
          players.map((player: IPlayer, index: number) => {
            return <p>{player.name}</p>;
          })}
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    players: state.hub.players
  };
};

export default connect(mapStateToProps)(Lobby);
