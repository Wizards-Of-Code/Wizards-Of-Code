import React from "react";
import { Sprite } from "@inlet/react-pixi";
import mage2 from "./images/mage2.png";

// adjust image size to 1920x540 pixels 

const Player2 = props => {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  return (
    <Sprite anchor={0.5} x={innerWidth/1.5} y={innerHeight/3} image={mage2} scale={0.5} />
  );
};

export default Player2;
