import React from "react";
import { withAuthorization } from "../Session";
import { Link } from 'react-router-dom';

const HomePage = props => (
  <div className="home-page-container">
    <div className="home-page-navbar">
      <h1>Home Page</h1>
      <div className="user-history">
        <button className="user-history-btn">Battle History</button>
      </div>
      <div className="go-battle">
        <Link to={'/'}>
          <button className="go-to-battle">Go To Battle</button>
        </Link>
      </div>
      <div className="list-of-skills">
        <button className="list-skills">My Skills</button>
      </div>
    </div>
    <div className="profile-info">
      <img src="mage_2.png" alt="wizard" className="profile-pic" />
      <button className="change-profile-pic">Change Profile Picture</button>
      <div className="user-stats">
        <h1>Stats</h1>
        <h3>User name</h3>
        <h3>User email</h3>
        <h3>Experience: 100</h3>
        <h3>Health: 100%</h3>
      </div>
    </div>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
