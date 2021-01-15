import {
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

let newScreams;

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      return { ...state, screams: action.payload, loading: false };
    case SET_SCREAM:
      return { ...state, scream: action.payload };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload.newScream, ...state.screams],
      };
    case LOADING_DATA:
      return { ...state, loading: true };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      newScreams = [...state.screams];
      newScreams[index] = action.payload;
      state.screams = newScreams;
      if (state.scream.screamId === action.payload.screamId) {
        action.payload.comments = state.scream.comments;
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      newScreams = [...state.screams];
      newScreams = newScreams.filter(
        (scream) => scream.screamId !== action.payload
      );
      state.screams = newScreams;
      return {
        ...state,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
