import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import MyButton from "../utils/MyButton";

// MUI stuff
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Chat, Favorite, FavoriteBorder } from "@material-ui/icons";

//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../redux/actions/dataActions";
dayjs.extend(relativeTime);

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
};

class Scream extends Component {
  likedScream = () => {
    if (
      this.props.authenticated &&
      this.props.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else return false;
  };

  handleLikeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  handleUnLikeScream = () => {
    this.props.unLikeScream(this.props.scream.screamId);
  };

  render() {
    const {
      classes,
      scream: {
        createdAt,
        userImage,
        body,
        likeCount,
        userHandle,
        commentCount,
      },
      authenticated,
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/signin">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="unlike" handleClick={this.handleUnLikeScream}>
        <Favorite color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" handleClick={this.handleUnLikeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile picture"
        ></CardMedia>
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="Comment">
            <Chat color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  classes: Proptypes.object.isRequired,
  scream: Proptypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  likes: state.user.likes,
});

const mapActionsToProps = {
  likeScream,
  unLikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
