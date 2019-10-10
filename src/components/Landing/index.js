import React from "react";
import { Link } from "react-router-dom";
import OpenBattles from "./OpenBattles";
import { BATTLE } from "../../constants/routes";

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getOpenBattles();
  }

  render() {
    return (
      <div className="landing-page-container">
        <img
          className="home-img"
          src="https://wallpapermemory.com/uploads/489/wizard-background-hd-1080p-74705.jpg"
          alt=""
        />
        <div className="join-random-btl">
          <div className="create-battle">
            <Link to={BATTLE}>
              <button
                className="create-battle-btn"
                onClick={() => {
                  if (this.props.user.username) {
                    this.props.createBattle();
                  }
                }}
              >
                Create New Battle
              </button>
            </Link>
          </div>
          <Link to={BATTLE}>
            <button
              onClick={() => {
                if (this.props.user.username) {
                  this.props.joinRandomBattle();
                }
              }}
              className="join-random-btl-btn"
            >
              Join A Random Battle
            </button>
          </Link>

          <button className="join-random-btl-btn" disabled>
            Open Battles
          </button>
        </div>
        <div>
          {this.props.user.username ? (
            <div className="join-btl">
              <OpenBattles
                user={this.props.user}
                openBattles={this.props.openBattles}
                joinOpenBattle={this.props.joinOpenBattle}
              />
            </div>
          ) : (
            <div className="sign-in-box">
              <h1 className="please-sign-in">Please Sign In</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LandingPage;
