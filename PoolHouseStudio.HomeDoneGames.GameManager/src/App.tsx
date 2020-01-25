import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomDialog from "./components/CustomDialog";
import Navbar from "./components/Navbar";
import Container from "./components/screens/Container";
import { RootState } from "./store/reducers/RootReducer";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Gloria Hallelujah", "Roboto"].join(",")
  }
});

interface AppProps {
  error: any;
}

const App: React.FC<AppProps> = ({ error }) => {
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
            <Route exact path="/play" component={Container}></Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.global.error
  };
};

export default connect(mapStateToProps)(App);
