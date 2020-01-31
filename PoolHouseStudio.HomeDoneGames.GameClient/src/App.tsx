import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import JoinRoom from "./components/screens/JoinRoom";
import Lobby from "./components/screens/Lobby";
import Play from "./components/screens/Play";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

const App: React.FC = () => {
  useEffect(() => {
    // TODO: make connection to hub
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Container fixed={true} id="container">
          <Switch>
            {/* <Redirect from="/" to="/join" component={} /> */}
            <Route exact path="/join" component={JoinRoom} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/play" component={Play} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
