import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = props => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth updateState={props.setState} />
          ) : (
            <NavigationNonAuth />
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = props => (
  <ul className="nav">
    <Link to={ROUTES.BATTLE}>Battle</Link>
    <Link to={ROUTES.HOME}>Profile</Link>
    <Link to={ROUTES.ACCOUNT}>Account Info</Link>
    <Link to={ROUTES.ADMIN}>Admin</Link>
    <SignOutButton updateState={props.updateState} />
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="nav">
    <Link to={ROUTES.BATTLE}>Battle</Link>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </ul>
);

export default Navigation;
