import React from "react";
import {
  Link,
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
                return (
                  <CopyBox>
                    <p>
                      After being born and raised in St. Louis, I spent my
                      college years learning how to program in southern Indiana
                      with a semester-long excursion to the UK in the middle. I
                      landed in the Kansas City area shortly after graduating in
                      the summer of 2013.
                    </p>
                    <p>
                      Outside work, most of my attention goes towards watching
                      or playing Overwatch; playing, running, or watching
                      Dungeons &amp; Dragons; listening to the latest
                      progressive rock or power metal; being picky about food;
                      and spending time with my loving family: two aggressively
                      cute cats; a clumsy, joy-filled dog; and my wonderful
                      wife.
                    </p>
                  </CopyBox>
                );
              }}
            />
            <Route
              path="/home/professional-work"
              component={() => {
                return (
                  <CopyBox>
                    <p>
                      Since graduating from the University of Evansville in
                      2013, I've thrived in a handful of positions including
                      full LAMP stack work, a front-end specialty position (for
                      major brands like Gatorade and Frigidaire), and most
                      recently a UI-focused position with some C# when
                      necessary.
                    </p>
                    <p>
                      I generally prefer working with JavaScript (ES6/7, React)
                      and CSS (Sass, or a CSS-in-JS solution); the visual and
                      interactive aspects of the web are where I'm most
                      comfortable and find the most enjoyment.
                    </p>
                    <p>
                      I also prefer working in small teams. The best experience
                      I've had was with a single dedicated person covering each
                      part of a project, from design and user experience to
                      project management and development.
                    </p>
                  </CopyBox>
                );
              }}
            />
            <Route
              path="/home/personal-work"
              component={() => {
                return (
                  <CopyBox>
                    <p>
                      Admittedly, I don't do a lot of coding away from the
                      workplace. Every now and then I'll spend some time
                      learning a new piece of tech, like rendering static files
                      from a React app, or React's recent Hooks feature, and the
                      content is usually drawn from my hobbies. Recently I've
                      conceptualized a toolkit for Dungeons &amp; Dragons - I
                      like to call it Papers &amp; Pencils.
                    </p>
                    <p>
                      The first piece of P&amp;P is a mobile-friendly dice
                      roller that can be found at{" "}
                      <Link to="/pnp/dice" target="_blank">
                        /pnp/dice
                      </Link>
                      . While there are plenty of dice rolling apps online, most
                      of them are full of text input fields that just feel
                      cumbersome on a touch screen. This project is about 80%
                      done at this point; the last major step is adding offline
                      functionality by converting it to a Progressive Web App.
                      Code-wise, this app is a React stateless component (with
                      TypeScript) using Hooks. Though a little complex, it's
                      very light-weight.
                    </p>
                    <p>
                      Future pieces include a notebook app with cloud database
                      functionality (like Firebase) and a procedural map
                      generator.
                    </p>
                    <p>
                      The code for the dice roller, and now-outdated work on the
                      notebook, can be found{" "}
                      <a href="https://github.com/stevenrstone" target="_blank">
                        on my github
                      </a>
                      .
                    </p>
                  </CopyBox>
                );
              }}
            />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default withRouter(Content);
