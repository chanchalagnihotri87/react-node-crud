import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }>
            Home
          </NavLink>
          <NavLink
            to="/add-student"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }>
            Add Product
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
