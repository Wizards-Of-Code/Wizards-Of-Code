import React, { Component } from "react";
const textTransform = {
  transform: "scaleX(1) scaleY(1)"
};
class Player2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="healthName">
        <p style={{ ...textTransform, textAlign: "right" }}>
          {this.props.playerName}
        </p>
        <div style={textTransform} className="health-bar2">
          <div className="innerbar-lost2">
            <div className="innerbar-activ2">
              <p className="hp-points2">90%</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Player2;
