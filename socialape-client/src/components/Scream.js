import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import MyButton from "../utils/MyButton";
import DeleteScream from "../components/DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// MUI stuff
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Chat } from "@material-ui/icons";

//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Redux
import { connect } from "react-redux";
dayjs.extend(relativeTime);

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
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
        screamId,
      },
      authenticated,
      handle,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile picture"
        ></CardMedia>
        <CardContent className={classes.content}>
          {authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
          ) : null}
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comment">
            <Chat color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
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
  handle: state.user.credentials.handle,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Scream));
