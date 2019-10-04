import React from "react";
import { Stage, Sprite, Container } from "@inlet/react-pixi";
import background from "./green_forest.png";
import mage from "./mage.png";
import mage2 from "./mage2.png";
import CodeArea from "./codeArea";
import Instructions from "./instructions";
import Result from "./result";

const GameStage = props => {
  console.log('innerWidth', window.innerWidth,'outerWidth', window.outerWidth, 'background', background, 'innerHeight', window.innerHeight);
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  return (
    <div>
      <Stage
        // width={window.innerWidth}
        // height={window.innerHeight / 1.75}
        width={innerWidth}
        height={innerHeight/2}
        // options={{ backgroundColor: 0xf5f5f5 }}
      >
        {/* position={[150, 150]} */}
        <Container>
          <Sprite anchor={0.5} x={innerWidth/2} y={innerHeight/2} image={background} scale={1} />
          <Sprite anchor={0.5} x={100} y={90} image={mage} scale={2} />
          <Sprite anchor={0.5} x={800} y={100} image={mage2} scale={0.5} />
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
