import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  comments: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    default:
      return state;
  }
}

export default userReducer;
