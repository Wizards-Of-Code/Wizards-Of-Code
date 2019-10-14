import React, { Component } from 'react';

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

    btlInfo.map(btl => {
      if (
        btl.status === 'completed' &&
        (btl.user1 === this.props.user.username ||
          btl.user2 === this.props.user.username)
      ) {
        completedBtl.push(btl);
      }
    });
    console.log('BTL HISTORY', completedBtl);
    return (
      <div>
        <img
          className="home-img"
          src="https://wallpaperaccess.com/full/279729.jpg"
          alt=""
        />
        <h1 className="sign-up-logo">Battle history</h1>
        <div className="btl-history">
          {completedBtl.map(compB => (
            <div className="single-recored">
              <h1 className="btl-text">
                {compB.user1} VS {compB.user2}
              </h1>
              <h1 className="btl-text"> WINNER {compB.winner}</h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BattleHistory;
