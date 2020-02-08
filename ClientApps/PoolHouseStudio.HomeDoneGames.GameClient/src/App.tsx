import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomAlert from "./components/CustomAlert";
import Navbar from "./components/Navbar";
import JoinRoom from "./components/screens/JoinRoom";
import Lobby from "./components/screens/Lobby";
import Play from "./components/screens/Play";
import SimpleLoader from "./components/SimpleLoader";
import { AlertType } from "./models/enums/AlertType";
import { IError } from "./models/Error";
import { connectToHub } from "./store/actions/HubActions";
import { IRootState } from "./store/reducers/RootReducer";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

interface IAppProps {
  connectToHub: () => Promise<void>;
  error: IError | null;
  loading: boolean;
}

const App: React.FC<IAppProps> = ({ error, loading, connectToHub }) => {
  useEffect(() => {
    connectToHub();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Container fixed={true} id="container">
          {error && (
            <CustomAlert type={AlertType.Error} message={error.message} />
          )}
          {loading ? (
            <SimpleLoader />
          ) : (
            <Switch>
              <Route exact path="/" component={JoinRoom} />
              <Route exact path="/join" component={JoinRoom} />
              <Route exact path="/lobby" component={Lobby} />
              <Route exact path="/play" component={Play} />
            </Switch>
          )}
        </Container>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    error: state.global.error,
    loading: state.global.loading
  };
};

export default connect(mapStateToProps, { connectToHub })(App);
