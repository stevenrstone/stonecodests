import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./button.css";
import { string } from "prop-types";

interface ButtonProps {
  children: React.ReactNode;
  link: string;
}

// const Button: React.StatelessComponent<{ link: string }> = props => (
const Button = (props: any) => (
  <NavLink
    to={props.link !== props.location.pathname ? props.link : "/"}
    activeClassName="active"
    className="button"
  >
    {console.log(
      props.match.path,
      props.location.pathname,
      props.match.path !== props.location.pathname
    )}
    {props.children}
  </NavLink>
);

export default withRouter(Button);
