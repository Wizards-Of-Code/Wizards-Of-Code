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
        <div className="join-random-btl">
          <div className="create-battle">
            <button className="create-battle-btn">Create New Battle</button>
          </div>
          <Link to={`/gamestage`}>
            <button className="join-random-btl-btn">
              Join A Random Battle
            </button>
          </Link>
          <div>
            <button className="join-random-btl-btn" disabled>
              Open Battles
            </button>
            <OpenBattles openBattles={this.props.openBattles} />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
