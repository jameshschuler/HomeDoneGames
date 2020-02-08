import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import CustomAlert from "./components/CustomAlert";
import Navbar from "./components/Navbar";
import About from "./components/screens/About";
import GameMenu from "./components/screens/GameMenu";
import Lobby from "./components/screens/Lobby";
import SelectGame from "./components/screens/SelectGame";
import { AlertType } from "./models/enums/AlertType";
import { IError } from "./models/Error";
import GameType from "./models/GameType";
import { RootState } from "./store/reducers/RootReducer";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

interface IAppProps {
  error: IError | null;
  loading: boolean;
  selectedGame: GameType | null;
}

const App: React.FC<IAppProps> = ({ error, loading, selectedGame }) => {
  return (
    <ThemeProvider theme={theme}>
      <div id="container">
        <Router>
          <Navbar />

          {error && (
            <CustomAlert type={AlertType.Error} message={error.message} />
          )}
          <Switch>
            <>
              <Route exact path="/play" component={SelectGame}></Route>
              {selectedGame ? (
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
    loading: state.global.loading,
    selectedGame: state.gameState.selectedGame
  };
};

export default connect(mapStateToProps)(App);
