import React from "react";

const Result = props => {

  return (
    <div className="result">
      <div className="title">Result:</div>
      { props.result.userOutputs ? (
        <div>
          <p>{props.result.correct ? 'CORRECT!' : 'TRY AGAIN :('}</p>
          <p>Expected Output:</p>
          <p>{props.problem.outputs}</p>
          <p>Your Output:</p>
          <p>{JSON.stringify(props.result.userOutputs)}</p>
        </div>
      ) : '' }
      <button className="buttonFont" onClick={() => props.submitCode(props.userCode, props.problem.inputs, props.problem.outputs)}>
        SUBMIT CODE
      </button>
    </div>
  );

};

export default Result
