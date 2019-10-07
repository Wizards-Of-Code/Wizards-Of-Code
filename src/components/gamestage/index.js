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
import Explosion from './Bunnymark'

const height = window.innerHeight
const width = window.innerWidth
const OPTIONS = {
  height: window.innerHeight / 1.75,
  width: window.innerWidth
}

const GameStage = props => {
  return (
    <div>
      <div>
        <Stage options={OPTIONS} >
          <Sprite
            texture={PIXI.Texture.from(greenForest)} scale={1}
          />
          <Player x={width / 3} y={height / 3} image={mage} scale={0.5} />
          <Player x={width / 1.5} y={height / 3} image={mage2} scale={0.5} />
          <Explosion />
        </Stage>
      </div>
      <div className="taskbox">
        <Instructions prompt={props.problem.prompt} getProblem={props.getProblem} />
        <CodeArea userCode={props.userCode} updateCode={props.updateCode} />
        <Result submitCode={props.submitCode} userCode={props.userCode} problem={props.problem} result={props.result}/>
      </div>
    </div>
  )
}

export default GameStage
