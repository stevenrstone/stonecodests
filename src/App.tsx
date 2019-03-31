import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Button from "./components/button/button";
import Content from "./components/content/content";
import "./App.css";

const App = () => (
  <Router>
    <div className="container">
      <header className="header">Stone Code Productions</header>
      <div className="content">
        <section className="content-view">
          <Content />
        </section>
        <section className="menu">
          <nav>
            <Button link="/about">About</Button>
            <Button link="/work">Work</Button>
            <Button link="/contact">Contact</Button>
          </nav>
        </section>
      </div>
    </div>
  </Router>
);

export default App;
