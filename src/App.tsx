import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
// @ts-ignore
import Div100vh from 'react-div-100vh';
import Home from "./routes/home";
import Dice from "./routes/pnp/dice";

import "./App.css";

const App = () => (
  <Router>
    <Div100vh>
      <div className="container">
        <header className="header">Stone Coded</header>
        <div className="content">
          <Switch>
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

            <Route
              path="/*"
              redirect="/home"
              exact={true}
              component={() => <Redirect to="/home" />}
            />
          </Switch>
        </div>
      </div>
    </Div100vh>
  </Router>
);

export default App;
