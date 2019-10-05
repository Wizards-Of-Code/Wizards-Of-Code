import firebase from '../index';

// ACTION TYPE



const initialState = {

};

// ACTION CREATOR




// THUNK CREATORS



const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIV_BATTLES:
      return { ...state, result: action.result };
    case GOT_PROBLEM:
      return { ...state, problem: action.problem, inputs: action.inputs };
    case GOT_CODE:
      return { ...state, code: action.code };
    default:
      return state;
  }
};

export default gameReducer;
