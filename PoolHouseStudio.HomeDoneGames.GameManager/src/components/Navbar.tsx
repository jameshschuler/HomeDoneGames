import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div id="navbar">
      <ul id="nav-left">
        <li>
          <NavLink to="/play">Play</NavLink>
        </li>
      </ul>
      <ul id="nav-right">
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
