import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import AppIcon from "../images/ape.png";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

//REdux stuffs
import { signInUser } from "../redux/actions/userActions";
import { connect } from "react-redux";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20 0",
    width: 100,
  },
  button: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
  },
  progress: {
    position: "absolute",
  },
  generalError: {
    color: "red",
    fontSize: "0.85rem",
    marginTop: 10,
  },
};

class signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.signInUser(userData, this.props.history);
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img
            src={AppIcon}
            alt="socialape logo"
            className={classes.image}
          ></img>
          <Typography variant="h2">Login</Typography>
          <form noValidate>
            <TextField
              id="email"
              name="email"
              label="Email"
              onChange={this.handleChange}
              type="email"
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
            ></TextField>
            <TextField
              id="password"
              name="password"
              label="Password"
              onChange={this.handleChange}
              type="password"
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
            ></TextField>
            {errors.general ? (
              <Typography variant="body2" className={classes.generalError}>
                {errors.general}
              </Typography>
            ) : null}
            <Button
              onClick={this.handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              LOGIN
              {loading ? (
                <CircularProgress className={classes.progress} size={20} />
              ) : null}
            </Button>
            <br />
            <small>
              Don't have an account? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signin.propTypes = {
  classes: Proptypes.object.isRequired,
  UI: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired,
  signInUser: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  signInUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signin));
