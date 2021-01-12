import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  comments: [],
  loading: false,
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
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default userReducer;
