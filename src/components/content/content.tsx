import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CopyBox from "../copy-box/copy-box";

import "./content.css";

const Content = (props: any) => (
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
              path="/about"
              component={() => {
                return <CopyBox>About</CopyBox>;
              }}
            />
            <Route
              path="/work"
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
