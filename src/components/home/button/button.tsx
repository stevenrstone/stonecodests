import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "./button.css";
import { string } from "prop-types";

interface ButtonProps {
  children: React.ReactNode;
  link: string;
}

type ComponentProps = ButtonProps & RouteComponentProps;

const Button = (props: ComponentProps) => (
  <NavLink
    to={props.link !== props.location.pathname ? props.link : "/home"}
    activeClassName="active"
    className="button"
  >
    {props.children}
  </NavLink>
);

export default withRouter(Button);
