import React from "react";
import { Link } from "react-router-dom";
import OpenBattles from "./OpenBattles";

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
            <button className="create-battle-btn">Create New Battle</button>
          </div>
          <Link to={`/gamestage`} >
            <button className="join-random-btl-btn">
              Join A Random Battle
            </button>
          </Link>
          <button className="join-random-btl-btn" disabled>
            Open Battles
          </button>
        </div>
        <div className="join-btl">
          <OpenBattles openBattles={this.props.openBattles} />
        </div>
      </div>
    );
  }
}

export default LandingPage;
