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
        <div className={elrondIdle} style={convertDirection}><Player1 /></div>
        <div className={player2FireBall}><Attacking /></div>
        <div className={galadrielIdle}><Player2 /></div>
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

const galadrielCastsSpell = "galadriel-casts-spell"
const galadrielIdle = "galadriel-idle"
const elrondCastsSpell = "elrond-casts-spell"
const elrondIdle = "elrond-idle"
const player1FireBall = "fireball-right"
const player2FireBall = "fireball-left"



// all players are animated to be player 2 (facing left), if we were to make them player1, we would have to convert their facing direction, that's why we add style={convertDirection} in Player1 div
const convertDirection ={
  transform: 'scaleX(-0.7) scaleY(0.7)'
}