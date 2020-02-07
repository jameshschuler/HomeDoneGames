import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import CustomDialog from "./components/CustomDialog";
import Navbar from "./components/Navbar";
import About from "./components/screens/About";
import GameMenu from "./components/screens/GameMenu";
import Lobby from "./components/screens/Lobby";
import SelectGame from "./components/screens/SelectGame";
import GameType from "./models/GameType";
import { callHealthcheck } from "./store/actions/GlobalActions";
import { RootState } from "./store/reducers/RootReducer";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

interface IAppProps {
  callHealthcheck: () => void;
  error: any;
  isHealthy: boolean;
  selectedGameType?: GameType;
  loading: boolean;
}

const App: React.FC<IAppProps> = ({
  callHealthcheck,
  error,
  isHealthy,
  selectedGameType,
  loading
}) => {
  useEffect(() => {
    callHealthcheck();
  }, [callHealthcheck]);

  const hasError = () => {
    if (error) {
      return (
        <CustomDialog
          title={error.title}
          message={error.message}
          open={true}
        ></CustomDialog>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="container">
        <Router>
          <Navbar />
          {hasError()}
          <Switch>
            <>
              <Route exact path="/play" component={SelectGame}></Route>
              {selectedGameType ? (
                <>
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
                <Redirect to="/play" />
              )}
            </>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.global.error,
    isHealthy: state.global.isHealthy,
    loading: state.global.loading,
    selectedGameType: state.gameState.selectedGameType
  };
};

export default connect(mapStateToProps, { callHealthcheck })(App);
