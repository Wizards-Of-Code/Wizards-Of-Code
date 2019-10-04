import React from "react";
import { withAuthorization } from "../Session";

const HomePage = props => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
