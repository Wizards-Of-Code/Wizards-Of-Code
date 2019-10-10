import React, {Component} from 'react'
const textTransform ={
  transform: 'scaleX(1) scaleY(1)'
}
class Player2 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div><h1 style={textTransform} >Player2</h1></div>
  }
}
export default Player2
