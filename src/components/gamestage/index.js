import React from 'react'
import {Stage, Sprite, Container} from '@inlet/react-pixi'
import mage from './mage.png'
import CodeArea from './codeArea'

const GameStage = () => (
  <div>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight / 2}
      options={{backgroundColor: 0xf5f5f5}}
    >
      <Container position={[150, 150]}>
        <Sprite anchor={0.5} x={100} y={100} image={mage} />
      </Container>
    </Stage>
    <CodeArea />
  </div>
)

export default GameStage
