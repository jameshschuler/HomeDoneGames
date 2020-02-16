import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Error } from "../../models/Error";
import { createRoom } from "../../store/actions/HubActions";
import { IRootState } from "../../store/reducers/RootReducer";

interface CreateRoomState {
  playerName: string;
}

interface CreateRoomProps {
  createRoom: (playerName: string, roomCode?: string) => any;
  error: Error | undefined;
  history: any;
}

const CreateRoom: React.FC<CreateRoomProps> = ({
  createRoom,
  error,
  history
}) => {
  const [values, setValues] = useState<CreateRoomState>({
    playerName: ""
  });

  const handleChange = (prop: keyof CreateRoomState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    setValues({ ...values, [prop]: value });
  };

  const submitForm = async (e: Event) => {
    e.preventDefault();
    await createRoom(values.playerName);

    if (!error) {
      console.log("error:", error);
      history.push("/lobby");
    }
  };

  return (
    <Grid item xs={12} sm={8} id="create-room">
      <Paper className="paper" elevation={0}>
        <Typography variant="h6">
          Enter a name to get started! Room Code is optional
        </Typography>

        <form
          id="create-room-form"
          onSubmit={(e: any) => submitForm(e)}
          autoComplete="off"
        >
          <TextField
            required
            id="playerName"
            label="Player Name"
            variant="outlined"
            placeholder="Enter a name"
            onChange={handleChange("playerName")}
            value={values.playerName}
          />

          <Button
            size="medium"
            variant="contained"
            color="primary"
            type="submit"
          >
            Create Room
          </Button>
        </form>

        <Link to="/select-game">Back to Select Game</Link>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    error: state.global.error
  };
};

export default connect(mapStateToProps, { createRoom })(CreateRoom);
