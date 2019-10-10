import React, { Component } from "react";
const textTransform = {
  transform: "scaleX(1) scaleY(1)",
  color: "white"
};
class Player2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={textTransform} color="white">
          {this.props.playerName}
        </h1>
        <div className="helth-bar2">
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
