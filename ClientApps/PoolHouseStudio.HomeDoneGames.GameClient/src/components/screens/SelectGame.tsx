import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const SelectGame = () => {
  return (
    <Grid item xs={12} sm={8} id="join-room">
      <Link to="/join-room" className="back-link">
        <i className="fas fa-fw fa-arrow-circle-left"></i>
        <span>Join Room</span>
      </Link>
      <Paper className="paper" elevation={0}>
        <Typography align="center" variant="h4">
          Select Game
        </Typography>

        <div className="games">
          <Button
            className="link-button"
            size="medium"
            variant="contained"
            color="secondary"
            type="button"
          >
            <Link to="/create-room">Never Have I Ever</Link>
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default SelectGame;
