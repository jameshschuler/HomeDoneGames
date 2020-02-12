import { Button, Grid, Paper, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { connect } from "react-redux";
import { IError } from "../../models/Error";
import { IJoinRoomRequest } from "../../models/JoinRoomRequest";
import { joinRoom } from "../../store/actions/HubActions";
import { IRootState } from "../../store/reducers/RootReducer";

interface IJoinRoomState {
  roomCode: string;
  playerName: string;
}

interface IJoinRoomProps {
  error: IError | undefined;
  joinRoom: (request: IJoinRoomRequest) => Promise<void>;
  history: any;
}

const JoinRoom: React.FC<IJoinRoomProps> = ({ error, joinRoom, history }) => {
  const [values, setValues] = useState<IJoinRoomState>({
    roomCode: "",
    playerName: ""
  });

  const handleChange = (prop: keyof IJoinRoomState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (event.target.id === "roomCode") value = value.toUpperCase();
    setValues({ ...values, [prop]: value });
  };

  const submitForm = async (e: Event) => {
    e.preventDefault();
    await joinRoom({
      name: values.playerName,
      roomCode: values.roomCode.toUpperCase()
    });
  };

  return (
    <Grid item xs={12} sm={8} id="join-room">
      <Paper className="paper" elevation={0}>
        <Typography variant="h6">
          Enter a room code and name to get started!
        </Typography>

        <form
          id="join-room-form"
          onSubmit={(e: any) => submitForm(e)}
          autoComplete="off"
        >
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

const mapStateToProps = (state: IRootState) => {
  return {
    error: state.global.error
  };
};

export default connect(mapStateToProps, { joinRoom })(JoinRoom);
