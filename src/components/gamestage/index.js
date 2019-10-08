import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'

const height = window.innerHeight
const width = window.innerWidth
const OPTIONS = {
  height: window.innerHeight / 1.75,
  width: window.innerWidth
}

const GameStage = props => {
  console.log(window.innerHeight, window.innerWidth)
  return (
    <div className="gamepage">
      <div>
        <div className="box">
      </div>
      </div>
      <div className="taskbox">
        <Instructions prompt={props.problem.prompt} getProblem={props.getProblem} />
        <CodeArea userCode={props.userCode} updateCode={props.updateCode} />
        <Result submitCode={props.submitCode} userCode={props.userCode} problem={props.problem} result={props.result}/>
      </div>
    </div>
  )
}

export default GameStage
