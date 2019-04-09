import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import Home from "./routes/home";

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
      </div>
    </div>
  </Router>
);

export default App;
