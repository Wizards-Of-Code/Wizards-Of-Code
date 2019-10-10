import React, { Component } from "react";

class Player1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='helth-bar1'>
          <div className="innerbar-lost1">
            <div className="innerbar-activ1">
              <p className="hp-points1">90%</p>
            </div>
          </div>
        </div>
        <div className="galadriel-cast-spell"></div>
      </div>
    );
  }
}
export default Player1
