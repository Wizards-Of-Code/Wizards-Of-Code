import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <div className="profile">
      <h1>Profile</h1>
    </div>
    <div className="battle-btn">
      <button>To the battle</button>
    </div>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
