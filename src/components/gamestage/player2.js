import React, { Component } from "react";
const whiteText = {
  color: "white"
};
class Player2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hp = this.props.playerHP;
    return (
      <div>
        <h1 style={whiteText}>
          {this.props.playerName
            ? this.props.playerName
            : 'Waiting for Opponent...'}
        </h1>
        <div className="health-bar2">
          <div className="innerbar-lost2">
            <div style={{ width: `${hp * 4}px` }} className="innerbar-activ2">
              <p className="hp-points2">{hp}HP</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Player2;
