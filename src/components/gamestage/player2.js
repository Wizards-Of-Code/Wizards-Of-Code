import React, {Component} from 'react'
const textTransform ={
  transform: 'scaleX(1) scaleY(1)'
}
class Player2 extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <h1 style={textTransform} >Player2</h1>
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
