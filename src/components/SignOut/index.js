import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = props => (
  <button
    type="button"
    onClick={() => {
      props.updateState({ user: {} });
      props.firebase.doSignOut();
    }}
    className="sign-out-btn"
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
