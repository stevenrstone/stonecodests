import * as React from "react";
import { NavLink } from "react-router-dom";
import "./button.css";
import { string } from "prop-types";

interface ButtonProps {
  children: React.ReactNode;
  link: string;
}

const Button: React.StatelessComponent<{ link: string }> = ({
  link,
  children
}) => (
  <NavLink to={link} activeClassName="active" className="button">
    {children}
  </NavLink>
);

export default Button;
