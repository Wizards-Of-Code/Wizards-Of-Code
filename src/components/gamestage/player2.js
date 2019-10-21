import React, {Component} from 'react'
const textTransform = {
  transform: 'scaleX(1) scaleY(1)',
  marginBottom: '0%'
}
class Player2 extends Component {

  render() {
    let hp = this.props.playerHP
    return (
      <div className="healthName">
        <p style={{...textTransform, textAlign: 'right'}}>
          {this.props.playerName
            ? this.props.playerName
            : 'Waiting for Opponent...'}
        </p>
        <div style={textTransform} className="health-bar2">
          <div className="innerbar-lost2">
            <div style={{width: `${hp * 4}px`}} className="innerbar-activ2">
              <p className="hp-points2">{hp}HP</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Player2
