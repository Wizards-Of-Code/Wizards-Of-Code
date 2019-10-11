import React from "react";
import { Link } from "react-router-dom";
import OpenBattles from "./OpenBattles";
import { BATTLE } from "../../constants/routes";

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getOpenBattles();
  }

  render() {

    console.log(this.props.openBattles, this.props);

    return (
      <div className="landing-page-container">
        <img
          className="home-img"
          src="https://wallpapermemory.com/uploads/489/wizard-background-hd-1080p-74705.jpg"
          alt=""
        />
        {this.props.user.username ? (
          <div>
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
              <div className="join-btl">
                <OpenBattles
                  user={this.props.user}
                  openBattles={this.props.openBattles}
                  joinOpenBattle={this.props.joinOpenBattle}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="sign-in-box">
            <h1 className="wizards-of-code">Wizards Of Code</h1>
          </div>
        )}
      </div>
    );
  }
}

export default LandingPage;
