import React from "react";
import { Link } from "react-router-dom";
import OpenBattles from "./OpenBattles";
import { GAMESTAGE } from "../../constants/routes";

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getOpenBattles();
  }

  redirect () {
    this.props.history.push(GAMESTAGE);
  }

  render() {

    if (this.props.activeBattle !== '') {
      this.props.history.push(GAMESTAGE);
    }

    return (
      <div className="landing-page-container">
        <img
          className="home-img"
          src="https://wallpapermemory.com/uploads/489/wizard-background-hd-1080p-74705.jpg"
          alt=""
        />
        <div className="join-random-btl">
          <div className="create-battle">
            <Link to={`/gamestage`}>
              <button
                className="create-battle-btn"
                onClick={this.props.createBattle}
              >
                Create New Battle
              </button>
            </Link>
          </div>
          <Link to={`/gamestage`}>
            <button
              onClick={this.props.joinRandomBattle}
              className="join-random-btl-btn"
            >
              Join A Random Battle
            </button>
          </Link>

          <button className="join-random-btl-btn" disabled>
            Open Battles
          </button>
        </div>
        <div className="join-btl">
          <OpenBattles
            openBattles={this.props.openBattles}
            joinOpenBattle={this.props.joinOpenBattle}
          />
        </div>
      </div>
    );
  }
}

export default LandingPage;
