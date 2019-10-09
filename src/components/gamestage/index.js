import React from "react";
import CodeArea from "./codeArea";
import Instructions from "./instructions";
import Result from "./result";
import Player from "./Player";

const GameStage = props => {
  return (
    <div className="gamepage">
      <div className="gamestage">
        <Player />
      </div>
      <div className="taskbox">
        <Instructions
          prompt={props.problem.prompt}
          getProblem={props.getProblem}
          doDamage={props.doDamage}
          getRandomProblem={props.getRandomProblem}
        />
        <CodeArea userCode={props.userCode} updateCode={props.updateCode} />
        <Result
          submitCode={props.submitCode}
          userCode={props.userCode}
          problem={props.problem}
          result={props.result}
        />
      </div>
    </div>
  );
};

export default GameStage;
