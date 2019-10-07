import React, {Component} from 'react'
import {withApp, Sprite} from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import explosion from './images/explosion/expl_04_0015.png'

class Explosion extends Component {
  imageClick() {
    console.log('Click')
  }
  render() {
    return ( 
      <Sprite 
        texture={PIXI.Texture.from(explosion)}
        pointerdown={this.imageClick}
        {...this.props} 
      />
    )}
}

export default Explosion
