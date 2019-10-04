import firebase from "../index";

const GOT_CODE = "GOT_CODE";
const GOT_PROBLEM = "GOT_PROBLEM";

const initialState = {
  code: "",
  problem: ""
};

const gotCode = code => ({
  type: GOT_CODE,
  code
});
const gotProblem = problem => ({
  type: GOT_PROBLEM,
  problem
});

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
    dispatch(gotCode(code));
  };
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CODE:
      return { ...state, code: action.code };
    case GOT_PROBLEM:
      return { ...state, problem: action.problem };
    default:
      return state;
  }
};

export default gameReducer;
