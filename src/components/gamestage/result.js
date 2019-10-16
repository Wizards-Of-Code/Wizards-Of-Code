import React from "react";

const Result = props => {

  const {result, previousProblem} = props;

  let inputs, expectedOutputs, userOutputs;

  if (result.userOutputs) {
    inputs = JSON.parse(previousProblem.inputs);
    expectedOutputs = JSON.parse(previousProblem.outputs);
    userOutputs = result.userOutputs;
  }

  return (
    <div className="result">
        {/* <div className="title-result">{!result.userOutputs ? 'Result:' : result.correct ? "CORRECT!" : "TRY AGAIN :("}</div>
        <div className='result-box'>
          {result.userOutputs ? (
            <div>
            <table id='result-table'>
              <tr>
                <th>Input</th>
                <th>Your Output</th>
                <th>Expected</th>
              </tr>
              {inputs.map((input, index) => (
                <tr key={index}>
                  <td>{JSON.stringify(input)}</td>
                  <td>{JSON.stringify(userOutputs[index])}</td>
                  <td>{JSON.stringify(expectedOutputs[index])}</td>
                </tr>
              ))}
            </table>
          </div>
      ) : (
          <table id='result-table'>
            <tr>
              <th>Input</th>
              <th>Your Output</th>
              <th>Expected</th>
            </tr>
          </table>
        )}
        </div> */}
        <div>
          <button
            onClick={() =>
              props.submitCode(
                props.userCode,
                props.problem.inputs,
                props.problem.outputs
              )
            }
            className="submit-result"
          >
            SUBMIT CODE
          </button>
        </div>
    </div>
  );
};

export default Result;
