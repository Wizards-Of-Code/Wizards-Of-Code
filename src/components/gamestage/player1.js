import React, { Component } from "react";

const whiteText = {
  color: 'white'
}
class Player1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={whiteText}>
          {this.props.playerName}
        </h1>
        <div className="health-bar1">
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
