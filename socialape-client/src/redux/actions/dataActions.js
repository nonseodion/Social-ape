import {
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
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

//Post a scream
const postScream = (scream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/scream", scream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
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

const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() =>
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      })
    )
    .catch((err) => console.log(err));
};

const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

const submitComment = (screamId, comment) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, { body: comment })
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

const getUserData = (userHandle) => (dispatch) => {
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export {
  likeScream,
  unLikeScream,
  getScreams,
  deleteScream,
  postScream,
  clearErrors,
  getScream,
  submitComment,
  getUserData,
};
