import React, { Component } from "react";

const whiteText = {
  color: 'white'
}


class Player1 extends Component {
  constructor(props) {
    super(props);
 
  }


  render() {
    console.log(this.props)
    let hp = this.props.playerHP
    console.log(hp)
    return (
      <div>
        <h1 style={whiteText}>
          {this.props.playerName}
        </h1>
        <div className="health-bar1">
          <div className="innerbar-lost1">
            <div style={{width: `${hp * 4}px`}} className="innerbar-activ1">
              <p className="hp-points1">{hp}HP</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Player1;
