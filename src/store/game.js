import firebase from "../index";

// ACTION TYPE
const GOT_RESULT = "GOT_RESULT";
const GOT_PROBLEM = "GOT_PROBLEM";
const GOT_CODE = "GOT_CODE"

const initialState = {
  code: "",
  problem: "",
  inputs: "",
  result: "",
};

// ACTION CREATOR
const gotResult = result => ({
  type: GOT_RESULT,
  result
});
const gotProblem = (problem, inputs) => ({
  type: GOT_PROBLEM,
  problem,
  inputs
});
const gotCode = code => ({
  type: GOT_CODE,
  code
})

export const getCode = code => {
  return dispatch => {
    dispatch(gotCode(code))
  }
}


// THUNK CREATORS
export const getProblem = id => {
  return async dispatch => {
    const data = firebase.problem(id);
    // console.log(firebase.problem(id));

    data.get().then(doc => {
      dispatch(gotProblem(doc.data().prompt, JSON.parse(doc.data().inputs)));
    });
  };
};

export const submitCode = (code, inputs) => {

  return async dispatch => {
    const webWorker = new Worker('webWorker.js');

    webWorker.postMessage({
      inputs: inputs,
      userFunction: code
    })

    webWorker.onmessage = await function(event) {
      dispatch(gotResult(event.data));
      webWorker.terminate();
    }

  };
};


const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RESULT:
      return { ...state, result: action.result };
    case GOT_PROBLEM:
      return { ...state, problem: action.problem, inputs: action.inputs };
    case GOT_CODE:
      return { ...state, code: action.code};
    default:
      return state;
  }
};

export default gameReducer;
