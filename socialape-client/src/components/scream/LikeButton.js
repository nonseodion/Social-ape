import React from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";
import MyButton from "../../utils/MyButton";

export default function LikeButton({ screamId }) {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.user.likes);
  const authenticated = useSelector((state) => state.user.authenticated);

  const likedScream = () => {
    if (authenticated && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else return false;
  };

  const handleLikeScream = () => {
    dispatch(likeScream(screamId));
  };

  const handleUnLikeScream = () => {
    dispatch(unLikeScream(screamId));
  };

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/signin">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="unlike" handleClick={handleUnLikeScream}>
      <Favorite color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" handleClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
}

LikeButton.propTypes = {
  screamId: Proptypes.string.isRequired,
};
