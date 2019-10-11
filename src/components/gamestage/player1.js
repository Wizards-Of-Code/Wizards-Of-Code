import React, { Component } from "react";
const textTransform = {
  transform: "scaleX(1) scaleY(1)"
};
class Player1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="healthName">
        <p style={textTransform}>{this.props.playerName}</p>
        <div style={textTransform} className="health-bar1">
          <div className="innerbar-lost1">
            <div className="innerbar-activ1">
              <p className="hp-points1">90%</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Player1;
