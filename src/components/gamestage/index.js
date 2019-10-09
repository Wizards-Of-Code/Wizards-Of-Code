import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player1 from './player1'
import Player2 from './player2'
import Attacking from './attacking'

const GameStage = props => {
  return (
    <div className="gamepage">
      <div className="gamestage">
      <Player1 />
      <Attacking  />
      <Player2 />
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
