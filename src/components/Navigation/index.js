import React from "react";
import { NavLink } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = props => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth
              updateState={props.setState}
              pageSound={props.pageSound}
            />
          ) : (
            <NavigationNonAuth pageSound={props.pageSound} />
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = props => (
  <ul className="nav">
    <NavLink
      to={ROUTES.HOME}
      activeClassName="navbarHighlight"
      onMouseDown={props.pageSound}
    >
      Wizards of Code
    </NavLink>
    <NavLink
      to={ROUTES.BATTLE}
      activeClassName="navbarHighlight"
      onMouseDown={props.pageSound}
    >
      Battle
    </NavLink>
    <NavLink
      to={ROUTES.PROFILE}
      activeClassName="navbarHighlight"
      onMouseDown={props.pageSound}
    >
      Profile
    </NavLink>
    <NavLink
      to={ROUTES.LEADERBOARD}
      activeClassName="navbarHighlight"
      onMouseDown={props.pageSound}
    >
      Leaderboard
    </NavLink>
    {/* <Link to={ROUTES.ADMIN}>Admin</Link> */}
    <SignOutButton
      updateState={props.updateState}
      pageSound={props.pageSound}
    />
  </ul>
);

const NavigationNonAuth = props => (
  <ul className="nav">
    <NavLink
      to={ROUTES.HOME}
      activeClassName="navbarHighlight"
      onMouseDown={props.pageSound}
    >
      Wizards of Code
    </NavLink>
    <NavLink
      to={ROUTES.SIGN_IN}
      activeClassName="navbarHighlight"
      onMouseDown={props.pageSound}
    >
      Sign In
    </NavLink>
  </ul>
);

export default Navigation;
