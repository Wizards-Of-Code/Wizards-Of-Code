import React from "react";
import { withAuthorization } from "../Session";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import imgCollection from './imgCollection'
import { BATTLE } from "../../constants/routes";


const HomePage = props => {
  return (
    <div className="home-page-container">
      <img
        className="home-img"
        src="https://wallpaperaccess.com/full/279729.jpg"
        alt=""
      />
      <div className="home-page-navbar">
        <div className="home-page-navbar-container">
          <h1 className="sign-up-logo">Home Page</h1>
          <div className="user-history">
            <button className="user-history-btn">Battle History</button>
          </div>
          <div className="go-battle">
            <Link to={BATTLE}>
              <button className="go-to-battle">Go To Battle</button>
            </Link>
          </div>
          <div className="list-of-skills">
            <button className="list-skills">My Skills</button>
          </div>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-container">
          <img src="mage_2.png" alt="wizard" className="profile-pic" />
          <Link to={'/avatars'}>
            <button className="change-profile-pic">
              Change Profile Picture
            </button>
          </Link>
          <div className="user-stats">
            <h1>Stats</h1>
            <h3>User name: {props.user.username}</h3>
            <h3>User email: {props.user.email}</h3>
            <h3>Experience: {props.user.experience}</h3>
            <h3>Health: {props.user.maxHealth}%</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(HomePage);
