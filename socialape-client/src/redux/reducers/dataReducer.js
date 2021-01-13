import {
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      return { ...state, screams: action.payload, loading: false };
    case LOADING_DATA:
      return { ...state, loading: true };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      const newScreams = [...state.screams];
      newScreams[index] = action.payload;
      state.screams = newScreams;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default dataReducer;
