
const initialState = {
  username: '',
  experience: 0,
  maxHealth: 0,
  skills: [],
};

// ACTION TYPES
const GOT_USER = 'GOT_USER';

// ACTION CREATOR
export const gotUser = (user, userId) => ({
  type: GOT_USER,
  user,
  userId
});

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return {
        ...state,
        uid: action.userId,
        username: action.user.username,
        experience: action.user.experience,
        maxHealth: action.user.maxHealth,
        skills: action.user.skills
      };
    default:
      return state;
  }
};

export default usersReducer;
