import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Container from "./components/screens/Container";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div id="container">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/play" component={Container}></Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
