import React, { Component } from "react";
import Proptypes from "prop-types";
//MUI stuff
import { withStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button } from "@material-ui/core";
//Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.others,
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.UI.errors) {
      return { errors: nextProps.UI.errors };
    } else {
      return { errors: {} };
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.screamId, this.state.body);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { authenticated, classes } = this.props;

    const { errors } = this.state;

    const commentForm = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            label="Comment"
            name="body"
            onChange={this.handleChange}
            error={errors.comment ? true : false}
            helperText={errors.comment}
          ></TextField>
          <hr className={classes.invisibleSeparator} />

          <Button type="submit" variant="contained" color="primary">
            SUBMIT
          </Button>
        </form>
        <hr className={classes.invisibleSeparator} />
        <hr className={classes.invisibleSeparator} />
        <br />
      </Grid>
    ) : null;

    return commentForm;
  }
}

CommentForm.propTypes = {
  UI: Proptypes.object.isRequired,
  authenticated: Proptypes.bool.isRequired,
  classes: Proptypes.object.isRequired,
  screamId: Proptypes.string.isRequired,
  submitComment: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
