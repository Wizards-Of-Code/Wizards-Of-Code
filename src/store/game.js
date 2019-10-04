import firebase from "../index";

// ACTION TYPE
const GOT_RESULT = "GOT_RESULT";
const GOT_PROBLEM = "GOT_PROBLEM";
const GOT_CODE = "GOT_CODE"

const initialState = {
  code: "",
  result: "",
  problem: ""
};

// ACTION CREATOR
const gotResult = result => ({
  type: GOT_RESULT,
  result
});
const gotProblem = problem => ({
  type: GOT_PROBLEM,
  problem
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
      dispatch(gotProblem(doc.data().prompt));
    });
  };
};

export const submitCode = code => {
  return async dispatch => {
    const webWorker = new Worker('../webWorker/webWorker.js');


    webWorker.postMessage({
      inputs: {input1: [4], input2: [3]},
      userFunction: code
    })

    webWorker.onmessage = function(event) {
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
      return { ...state, problem: action.problem };
    case GOT_CODE:
      return { ...state, code: action.code};
    default:
      return state;
  }
};

export default gameReducer;
