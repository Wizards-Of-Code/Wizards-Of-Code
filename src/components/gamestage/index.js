import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player from './Player'
import { LANDING } from '../../constants/routes'

const GameStage = props => {

  if (props.activeBattle === '') {
    props.history.push(LANDING);
  }

  return (
    <div className="gamepage">
      <Player />
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
