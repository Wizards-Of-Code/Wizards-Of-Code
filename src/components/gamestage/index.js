import React from 'react'
import {Stage, Sprite, Container, Text, PIXI} from '@inlet/react-pixi'
let Mage = PIXI.Sprite.from('./mage.png')
const GameStage = () => (
  <Stage width={1000} height={500} options={{backgroundColor: 0xf5f5f5}}>
    {/* <Container position={[50, 50]}> */}
    <Sprite anchor={0.5} x={100} y={100} image="Mage" />
    {/* </Container> */}
  </Stage>
)
export default GameStage
