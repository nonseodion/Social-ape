import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

const signInUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/signin", userData)
    .then((res) => {
      const FBIdToken = `Bearer ${res.data}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

const getUserData = () => (dispatch) => {
  axios.get("/user").then((res) => {
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  });
};

export { signInUser };
