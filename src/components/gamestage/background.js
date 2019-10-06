import React from "react";
import { Sprite } from "@inlet/react-pixi";
import greenForest from "./images/green_forest(resized).png";
// adjust image size to 1920x540 pixels 

const Background = props => {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  return (
    <Sprite anchor={0.5} x={innerWidth/2} y={innerHeight/3.5} image={greenForest} scale={1} />
  );
};

export default Background;
