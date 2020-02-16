import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const SelectGame = () => {
  return (
    <Grid item xs={12} sm={8} id="join-room">
      <Paper className="paper" elevation={0}>
        <Typography variant="h6">Select Game</Typography>
        <button>
          <Link to="/create-room">Never Have I Ever</Link>
        </button>
        <button>
          <Link to="/join-room">Back</Link>
        </button>
      </Paper>
    </Grid>
  );
};

export default SelectGame;
