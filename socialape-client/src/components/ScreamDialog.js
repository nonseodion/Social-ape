import React, { Component } from "react";
import Proptypes from "prop-types";
import MyButton from "../utils/MyButton";
import LikeButton from "./LikeButton";
import dayjs from "dayjs";

//Redux stuff
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

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

const styles = {
  separator: {
    border: "none",
    margin: 4,
  },
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
};

class ScreamDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false });
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
      },
      screamId,
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid spacing={10} container>
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
          <hr className={classes.separator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="Comment">
            <Chat color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
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
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream,
});

const mapActionsToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
