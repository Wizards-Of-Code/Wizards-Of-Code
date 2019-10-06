import React from "react";
import { Sprite } from "@inlet/react-pixi";
import mage from "./images/mage.png";

// adjust image size to 1920x540 pixels 

const Player1 = props => {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  return (
          <Sprite anchor={0.5} x={innerWidth/3} y={innerHeight/3} image={mage} scale={2} />
  );
};

export default Player1;
