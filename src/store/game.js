import firebase from "../components/Firebase";
const GOT_CODE = "GOT_CODE";

const initialState = {
  code: ""
};

const gotCode = code => ({
  type: GOT_CODE,
  code
});

export const submitCode = code => {
  return async dispatch => {
    dispatch(gotCode(code));
  };
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CODE:
      return { ...state, code: action.code };
    default:
      return state;
  }
};

export default gameReducer;
