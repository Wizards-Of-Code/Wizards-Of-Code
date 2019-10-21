import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignOutButton = props => (
  <button
    type="button"
    onClick={() => {
      props.firebase.doSignOut();
      props.updateState({ user: {} });
      props.history.push(ROUTES.HOME);
    }}
    onMouseDown={props.pageSound}
    className="sign-out-btn"
  >
    Sign Out
  </button>
);

export default withFirebase(withRouter(SignOutButton));
