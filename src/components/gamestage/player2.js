import React, { Component } from "react";
import { endianness } from "os";
const whiteText = {
  color: "white"
};
class Player2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={whiteText} >
        {this.props.playerName ? this.props.playerName : 'Waiting for Opponent...'}
        </h1>
        <div className="health-bar2">
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
