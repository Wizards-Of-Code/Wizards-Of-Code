import React, { Component } from "react";

class BattleHistory extends Component {
  componentDidMount() {
    this.props.getClosedBtls();
  }

  render() {
    let btlInfo;
    let wins = 0;
    let completedBtl = [];
    btlInfo = this.props.closedBtl.map(closedB => {
      return closedB.data();
    });

    btlInfo.map(btl => {
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
            if (this.props.user.username === compB.winner) {
              winBackground = "winBackground";
            } else {
              loseBackground = "loseBackground";
            }
            if (this.props.user.username === compB.player1)
              opponent = compB.player2;
            else opponent = compB.player1;

            return (
              <div
                className={`single-recored ${loseBackground} ${winBackground}`}
              >
                <h1 className={`btl-text`}>Opponent: {opponent}</h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BattleHistory;
