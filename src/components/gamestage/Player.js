import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withApp, Sprite} from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

const centerAnchor = new PIXI.Point(0.5, 0.5)
class Player extends Component {
  state = {
    rotation: 0
  }

  componentDidMount() {
    this.props.app.ticker.add(this.animate)
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate)
  }

  animate = delta => {
    this.setState(state => ({
      ...state
      // rotation: state.rotation + 0.1 * delta
    }))
  }

  render() {
    return (
      <Sprite
        anchor={centerAnchor}
        texture={PIXI.Texture.from(this.props.image)}
        rotation={this.state.rotation}
        {...this.props}
      />
    )
  }
}

Player.contextTypes = {
  app: PropTypes.object
}

export default withApp(Player)
