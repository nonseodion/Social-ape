import React, { Component } from "react";
import Proptypes from "prop-types";
import MyButton from "../utils/MyButton";

//Redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../redux/actions/dataActions";

//MUI stuff
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

const styles = {
  Dialog: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "3%",
    left: "90%",
  },
  submitButton: {
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
};

class PostScream extends Component {
  state = {
    errors: {},
    body: "",
    open: false,
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.UI.errors) {
      return { errors: nextProps.UI.errors };
    }
    return null;
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <>
        <MyButton tip="Post a new scream" handleClick={this.handleOpen}>
          <Add />
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
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                multiline
                rows="3"
                fullWidth
                onChange={this.handleChange}
                name="body"
                error={errors.body ? true : false}
                helperText={errors.body}
                label="SCREAM!!"
                placeholder="Scream to your fellow apes"
                type="text"
                className={classes.TextField}
              />
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                  disabled={loading}
                >
                  SEND
                  {loading && (
                    <CircularProgress
                      className={classes.progress}
                      size="10px"
                    />
                  )}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

PostScream.propTypes = {
  classes: Proptypes.object.isRequired,
  UI: Proptypes.object.isRequired,
  postScream: Proptypes.func.isRequired,
  clearErrors: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  postScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));
