import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Player } from "../../models/Player";
import { IRootState } from "../../store/reducers/RootReducer";

interface PlayProps {
  currentTurn: Player | undefined;
  history: any;
  isStarted: boolean | undefined;
  me: Player | undefined;
  roomCode: string | undefined;
}

interface PlayState {
  answer: string;
}

const Play: React.FC<PlayProps> = ({
  currentTurn,
  history,
  isStarted,
  me,
  roomCode
}) => {
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [values, setValues] = useState<PlayState>({
    answer: ""
  });

  useEffect(() => {
    setIsMyTurn(currentTurn?.connectionId === me?.connectionId);
  }, []);

  useEffect(() => {
    if (!isStarted) {
      history.push("join-room");
    }
  }, [isStarted]);

  const submitForm = async (e: Event) => {
    e.preventDefault();
    console.log(values);
  };

  const handleChange = (prop: keyof PlayState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Grid item xs={12} sm={8} id="play">
      <p className="room-code">{roomCode}</p>
      <Paper className="paper" elevation={0}>
        {isMyTurn ? (
          <div>
            <Typography align="center" variant="h4">
              Your Turn!
            </Typography>
            <form
              id="join-room-form"
              onSubmit={(e: any) => submitForm(e)}
              autoComplete="off"
            >
              <TextField
                id="player-answer"
                label="Never Have I Ever"
                multiline
                rows="4"
                variant="outlined"
                placeholder="Never Have I Ever..."
                onChange={handleChange("answer")}
                value={values.answer}
              />
              <Button
                size="medium"
                variant="contained"
                color="primary"
                type="submit"
              >
                Send!
              </Button>
            </form>
          </div>
        ) : (
          <Typography align="center" variant="h4">
            Waiting for Player...
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    currentTurn: state.hub.gameData?.currentTurn,
    isStarted: state.hub.gameData?.isStarted,
    me: state.hub.me,
    roomCode: state.hub.roomCode,
    turnOrder: state.hub.gameData?.turnOrder
  };
};

export default connect(mapStateToProps)(Play);
