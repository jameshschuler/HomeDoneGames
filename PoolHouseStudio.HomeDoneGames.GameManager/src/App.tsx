import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomDialog from "./components/CustomDialog";
import Navbar from "./components/Navbar";
import About from "./components/screens/About";
import GameMenu from "./components/screens/GameMenu";
import Lobby from "./components/screens/Lobby";
import SelectGame from "./components/screens/SelectGame";
import SimpleLoader from "./components/SimpleLoader";
import { callHealthcheck } from "./store/actions/GlobalActions";
import { RootState } from "./store/reducers/RootReducer";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

interface AppProps {
  callHealthcheck: () => void;
  error: any;
  isHealthy: boolean;
}

const App: React.FC<AppProps> = ({ callHealthcheck, error, isHealthy }) => {
  useEffect(() => {
    callHealthcheck();
  }, [callHealthcheck]);

  return (
    <ThemeProvider theme={theme}>
      <div id="container">
        <Router>
          <Navbar />
          {error && (
            <CustomDialog
              title={error.title}
              message={error.message}
              open={true}
            ></CustomDialog>
          )}

          <Switch>
            {isHealthy ? (
              <>
                <Route exact path="/play" component={SelectGame}></Route>
                {/* TODO: restrict routes unless a game has been selected  */}
                <Route
                  exact
                  path="/play/:gameTypeID/menu"
                  component={GameMenu}
                ></Route>
                <Route
                  exact
                  path="/play/:gameTypeID/about"
                  component={About}
                ></Route>
                <Route
                  exact
                  path="/play/:gameTypeID/lobby"
                  component={Lobby}
                ></Route>
              </>
            ) : (
              <SimpleLoader />
            )}
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.global.error,
    isHealthy: state.global.isHealthy
  };
};

export default connect(mapStateToProps, { callHealthcheck })(App);
