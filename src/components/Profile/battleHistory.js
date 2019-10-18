import React, { Component } from "react";

class BattleHistory extends Component {
  componentDidMount() {
    this.props.getClosedBtls();
  }

  render() {
    let btlInfo;
    let completedBtl = [];
    btlInfo = this.props.closedBtl.map(closedB => {
      return closedB.data();
    });

    btlInfo.foreach(btl => {
      if (
        btl.status === "completed" &&
        (btl.player1 === this.props.user.username ||
          btl.player2 === this.props.user.username)
      ) {
        completedBtl.push(btl);
      }
    });

    return (
      <div className="container1">
        <img
          className="home-img"
          src="https://wallpaperaccess.com/full/279729.jpg"
          alt=""
        />

        <h1 className="sign-up-logo">Battle history</h1>

        <div className="btl-history">
          {completedBtl.map(compB => {
            let winBackground = "";
            let loseBackground = "";
            let opponent = "";
            let opponentHealth = "";
            let myHealth = "";
            if (this.props.user.username === compB.winner) {
              winBackground = "winBackground";
            } else {
              loseBackground = "loseBackground";
            }
            if (this.props.user.username === compB.player1) {
              myHealth += compB.player1_health;
              opponent = compB.player2;
              opponentHealth += compB.player2_health;
            } else {
              myHealth += compB.player2_health;
              opponent = compB.player1;
              opponentHealth += compB.player1_health;
            }

            return (
              <div
                className={`single-recored ${loseBackground} ${winBackground}`}
              >
                <h1 className={`btl-text`}>{opponent}</h1>
                <h1 className={`btl-text`}>
                  Their Health: {opponentHealth} HP
                </h1>
                <h1 className={`btl-text`}> My Health: {myHealth}HP </h1>
                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BattleHistory;
