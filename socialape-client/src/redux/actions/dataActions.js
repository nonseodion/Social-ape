import {
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
} from "../types";
import axios from "axios";

const getScreams = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .get("/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
      console.log(err);
    });
};

//Like a scream
const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//unlike a scream
const unLikeScream = (screamId) => (dispatch) => {
  console.log(screamId);
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export { likeScream, unLikeScream, getScreams };
