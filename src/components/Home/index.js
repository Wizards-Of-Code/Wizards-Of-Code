import React from "react";
import { withAuthorization } from "../Session";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { gotUser } from '../../store/users';

const HomePage = (props) => {
  console.log(props)
  return (
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
          <h3>User name: {props.users.username}</h3>
          <h3>User email: {props.users.username}</h3>
          <h3>Experience: {props.users.experiense}</h3>
          <h3>Health: {props.users.maxHealth}%</h3>
        </div>
      </div>
    </div>
  );
  };

 const mapStateToProps = state => ({
   users: state.users
 });


const condition = authUser => !!authUser;
export default compose(withAuthorization(condition),
connect(mapStateToProps, null)
)(HomePage);
