import React from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CopyBox from "../copy-box/copy-box";

import "./content.css";

const Content = (props: RouteComponentProps) => (
  <div>
    <TransitionGroup className="transition-group">
      <CSSTransition
        classNames="transition"
        key={props.location.key}
        timeout={{ enter: 300, exit: 300 }}
      >
        <div className="route-container">
          <Switch location={props.location}>
            <Route
              path="/home/about"
              component={() => {
                return <CopyBox>About</CopyBox>;
              }}
            />
            <Route
              path="/home/professional-work"
              component={() => {
                return <CopyBox>Professional Work</CopyBox>;
              }}
            />
            <Route
              path="/home/personal-work"
              component={() => {
                return <CopyBox>Personal Work</CopyBox>;
              }}
            />
            <Route
              path="/home/work"
              component={() => {
                return <CopyBox>Work</CopyBox>;
              }}
            />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default withRouter(Content);
