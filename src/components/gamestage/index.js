import React from 'react'
import {Stage, Sprite} from 'react-pixi-fiber'
import Player from './Player'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import mage from './images/mage.png'
import mage2 from './images/mage2.png'
import * as PIXI from 'pixi.js'
import greenForest from './images/green_forest(resized).png'

const height = 450
const width = 600
const OPTIONS = {
  height: window.innerHeight / 2,
  width: window.innerWidth
}

const GameStage = props => {
  return (
    <div>
      <div>
        <Stage options={OPTIONS}>
          <Sprite
            texture={PIXI.Texture.from(greenForest)}
          />
          <Player x={width / 2} y={height / 2} image={mage} />
          <Player x={width} y={height} image={mage2} />
        </Stage>
      </div>
      <div className="taskbox">
        <Instructions />
        <CodeArea />
        <Result />
      </div>
    </div>
  )
}

export default GameStage
