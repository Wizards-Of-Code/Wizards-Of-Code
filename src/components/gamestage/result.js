import React from "react";

const Result = props => {

  return (
    <div className="result">
      <div className="title">Result:</div>
      <p>{JSON.stringify(props.result)}</p>
      <button className="buttonFont" onClick={() => props.submitCode(props.userCode, JSON.parse(props.problem.inputs))}>
        SUBMIT CODE
      </button>
    </div>
  );

};

export default Result