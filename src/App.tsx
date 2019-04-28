import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import Home from "./routes/home";
import Dice from "./routes/pnp/dice";

import "./App.css";

const App = () => (
  <Router>
    <div className="container">
      <header className="header">Stone Code Productions</header>
      <div className="content">
        <Route
          path="/"
          redirect="/home"
          exact={true}
          component={() => <Redirect to="/home" />}
        />
        <Route path="/home" component={Home} />
        <Route path="/pnp/dice" exact={true} component={Dice} />
        <Route
          path="/dice"
          redirect="/pnp/dice"
          exact={true}
          component={() => <Redirect to="/pnp/dice" />}
        />
      </div>
    </div>
  </Router>
);

export default App;
