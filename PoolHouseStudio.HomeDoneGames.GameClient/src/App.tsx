import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameClient from "./components/GameClient";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={GameClient} />
      </Switch>
    </Router>
  );
};

export default App;
