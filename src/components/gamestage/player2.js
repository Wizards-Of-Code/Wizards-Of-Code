import React, {Component} from 'react'

class Player2 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <div>
        <div className='helth-bar2'>
          <div className="innerbar-lost2">
            <div className="innerbar-activ2">
              <p className="hp-points2">90%</p>
            </div>
          </div>
        </div>
        <div className="elrond-casts-spell"></div>
     </div>
    )
  }
}
export default Player2
