import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ,
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
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.user,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes.filter(
            (like) => like.screamId !== action.payload.screamId
          ),
        ],
      };
    case MARK_NOTIFICATIONS_READ:
      const notifications = state.notifications.map((not) => {
        if (!not.read) not.read = true;
        return not;
      });
      return {
        ...state,
        notifications,
      };
    default:
      return state;
  }
}

export default userReducer;
