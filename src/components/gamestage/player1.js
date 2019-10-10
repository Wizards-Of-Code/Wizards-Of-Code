import React, { Component } from "react";
const textTransform ={
  transform: 'scaleX(-1) scaleY(1)',
  color: 'white'
}
class Player1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={textTransform} color='white'>{this.props.playerName}</h1>
        <div className='helth-bar1'>
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
export default Player1
