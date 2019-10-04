import React from "react";
import { Stage, Sprite, Container } from "@inlet/react-pixi";
import mage from "./mage.png";
import CodeArea from "./codeArea";
import Instructions from "./instructions";
import Result from "./result";

const GameStage = () => (
  <div>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight / 1.75}
      options={{ backgroundColor: 0xf5f5f5 }}
    >
      <Container position={[150, 150]}>
        <Sprite anchor={0.5} x={100} y={100} image={mage} />
      </Container>
    </Stage>
    <div className="taskbox">
      <Instructions />
      <CodeArea />
      <Result />
    </div>
  </div>
);

export default GameStage;
