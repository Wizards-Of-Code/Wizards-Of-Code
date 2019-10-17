import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="home-page-container centerUp">
        <h1 className="sign-up-logo">Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
