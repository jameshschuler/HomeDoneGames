import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import GameTypeSelect from "./components/screens/GameTypeSelect";

const App: React.FC = () => {
  return (
    <div id="container">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/play" component={GameTypeSelect}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
