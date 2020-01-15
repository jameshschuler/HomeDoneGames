import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import GameTypeSelect from "./components/screens/GameTypeSelect";

/*
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

*/

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/select-game" component={GameTypeSelect}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
