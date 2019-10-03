import React from 'react'
import {Stage, Sprite, Container} from '@inlet/react-pixi'
import mage from './mage.png'
const GameStage = () => (
  <Stage width={1000} height={500} options={{backgroundColor: 0xf5f5f5}}>
    <Container position={[150, 150]}>
    <Sprite anchor={0.5} x={100} y={100} image={mage} />
    </Container>
  </Stage>
)
export default GameStage
