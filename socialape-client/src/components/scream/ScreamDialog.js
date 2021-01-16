import React, { Component } from "react";
import Proptypes from "prop-types";
import MyButton from "../../utils/MyButton";
import LikeButton from "./LikeButton";
import dayjs from "dayjs";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//Redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

//MUI stuff
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import { UnfoldMore, Close, Chat } from "@material-ui/icons";

const styles = (theme) => ({
  ...theme.others,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    marginTop: 50,
    marginBottom: 50,
    textAlign: "center",
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
    newPath: null,
    oldPath: null,
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    const {
      scream: { userHandle },
      screamId,
    } = this.props;
    const oldPath = window.history.location;
    const newPath = `/users/${userHandle}/screams/${screamId}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, newPath, oldPath });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    const oldPath = !this.state.oldPath
      ? `/users/${this.props.scream.userHandle}`
      : this.state.oldPath;
    //console.log(oldPath, this.state.oldPath);
    window.history.pushState(null, null, oldPath);
    this.setState({ open: false });
    clearErrors();
  };

  render() {
    const {
      classes,
      UI: { loading },
      scream: {
        userImage,
        body,
        commentCount,
        likeCount,
        createdAt,
        userHandle,
        comments,
      },
      screamId,
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container>
        <Grid item sm={5}>
          <img
            alt="profile"
            className={classes.profileImage}
            src={userImage}
          ></img>
        </Grid>
        <Grid item sm={7}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="Comment">
            <Chat color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <>
        <MyButton
          tip="Expand Scream"
          handleClick={this.handleOpen}
          tipClassName={classes.expandButton}
        >
          <UnfoldMore />
        </MyButton>
        <Dialog
          open={this.state.open}
          fullWidth
          maxWidth="sm"
          className={classes.Dialog}
        >
          <MyButton
            tip="close"
            handleClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <Close />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

ScreamDialog.propTypes = {
  UI: Proptypes.object.isRequired,
  scream: Proptypes.object.isRequired,
  getScream: Proptypes.func.isRequired,
  classes: Proptypes.object.isRequired,
  screamId: Proptypes.string.isRequired,
  openDialog: Proptypes.string,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
