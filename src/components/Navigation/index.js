import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul className="nav">
    <Link to={ROUTES.BATTLE}>Battle</Link>
    <Link to={ROUTES.HOME}>Profile</Link>
    <Link to={ROUTES.ACCOUNT}>Account Info</Link>
    <Link to={ROUTES.ADMIN}>Admin</Link>
    <SignOutButton />
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="nav">
    <Link to={ROUTES.BATTLE}>Battle</Link>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </ul>
);

export default Navigation;
