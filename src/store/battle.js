import firebase from '../index';

// ACTION TYPE
const GET_ACTIVE_BATTLES = 'GET_ACTIVE_BATTLES';
const GOT_PROBLEM = 'GOT_PROBLEM';
const GOT_CODE = 'GOT_CODE';

const CREATE_BATTLE = 'CREATE_BATTLE';

// might be worth thinking about removing the redux store as a whole and using Firebase to handle the state of your application.

// don't initialize with null. use empty strings & empty objects instead
const initialState = {
  openBattles: [],
  history: [],
  active: {
    battleId: null,
    user1: null,
    user2: null,
    user1_health: null,
    user2_health: null,
    problem1: null,
    problem2: null,
    winner: null
  }
};

// ACTION CREATOR
const createBattle = battle => ({
  type: CREATE_BATTLE,
  battle
})



// THUNK CREATORS


const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_BATTLES:
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
