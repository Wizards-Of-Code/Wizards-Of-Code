import React from 'react'
import {Stage, Container} from '@inlet/react-pixi'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player1 from './player1'
import Player2 from './player2'
import Background from './background'
// adjust image size to 1920x540 pixels

const GameStage = props => {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  return (
    <div>
      <Stage width={innerWidth} height={innerHeight / 1.75}>
        <Container>
          <Background />
          <Player1 />
          <Player2 />
        </Container>
      </Stage>
      <div className="taskbox">
        <Instructions />
        <CodeArea />
        <Result />
      </div>
    </div>
  )
}

export default GameStage
