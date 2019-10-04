import React from "react";
import { Stage, Sprite, Container } from "@inlet/react-pixi";
import background from "./green_forest(resized).png";
import mage from "./mage.png";
import mage2 from "./mage2.png";
import CodeArea from "./codeArea";
import Instructions from "./instructions";
import Result from "./result";

// adjust image size to 1920x540 pixels 

const GameStage = props => {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  return (
    <div>
      <Stage
        width={innerWidth}
        height={innerHeight/1.75}
      >
        <Container>
          <Sprite anchor={0.5} x={innerWidth/2} y={innerHeight/3.5} image={background} scale={1} />
          <Sprite anchor={0.5} x={innerWidth/3} y={innerHeight/3} image={mage} scale={2} />
          <Sprite anchor={0.5} x={innerWidth/1.5} y={innerHeight/3} image={mage2} scale={0.5} />
        </Container>
      </Stage>
      <div className="taskbox">
        <Instructions />
        <CodeArea />
        <Result />
      </div>
    </div>
  );
};

export default GameStage;
