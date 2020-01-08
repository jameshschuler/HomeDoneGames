import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameClient from "./components/GameClient/GameClient";
import GameManager from "./components/GameManager/GameManager";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GameManager} />
        <Route path="/play" component={GameClient} />
      </Switch>
    </Router>
  );
};

export default App;
