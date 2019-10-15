import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = props => {
    console.log(props);
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
    <Link to={ROUTES.HOME} onMouseDown={props.pageSound}>
      Wizards of Code
    </Link>
    <Link to={ROUTES.BATTLE} onMouseDown={props.pageSound}>
      Battle
    </Link>
    <Link to={ROUTES.PROFILE} onMouseDown={props.pageSound}>
      Profile
    </Link>
    <Link to={ROUTES.ACCOUNT} onMouseDown={props.pageSound}>
      Account Info
    </Link>
    {/* <Link to={ROUTES.ADMIN}>Admin</Link> */}
    <SignOutButton
      updateState={props.updateState}
      pageSound={props.pageSound}
    />
  </ul>
);

const NavigationNonAuth = (props) => (
  <ul className="nav">
    <Link to={ROUTES.HOME} onMouseDown={props.pageSound}>
      Wizards of Code
    </Link>
    <Link to={ROUTES.SIGN_IN} onMouseDown={props.pageSound}>
      Sign In
    </Link>
  </ul>
);

export default Navigation;
