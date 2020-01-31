import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";

interface JoinRoomState {
  roomCode: string;
  playerName: string;
}

const JoinRoom: React.FC = () => {
  const [values, setValues] = useState<JoinRoomState>({
    roomCode: "",
    playerName: ""
  });

  const handleChange = (prop: keyof JoinRoomState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = (e: Event) => {
    e.preventDefault();
    console.log("submitForm", values);
    // TODO: send request to join group using room code
  };

  return (
    <Grid item xs={12} sm={8} id="join-room">
      <Paper className="paper" elevation={0}>
        <form id="join-room-form" onSubmit={(e: any) => submitForm(e)}>
          <TextField
            required
            id="roomCode"
            label="Room Code"
            variant="outlined"
            placeholder="Enter a room code"
            onChange={handleChange("roomCode")}
            value={values.roomCode}
          />
          <TextField
            required
            id="playerName"
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
            onChange={handleChange("playerName")}
            value={values.playerName}
          />
          <Button
            size="medium"
            variant="contained"
            color="primary"
            type="submit"
          >
            Join!
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default JoinRoom;
