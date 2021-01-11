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
import axios from "axios";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

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

class Signup extends Component {
  state = {
    handle: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.setState({ loading: true });

    axios
      .post("/signup", newUserData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errors: err.response.data, loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img
            src={AppIcon}
            alt="socialape logo"
            className={classes.image}
          ></img>
          <Typography variant="h2">Sign up</Typography>
          <form noValidate>
            <TextField
              id="handle"
              name="handle"
              label="Handle"
              onChange={this.handleChange}
              type="text"
              fullWidth
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
            ></TextField>
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              onChange={this.handleChange}
              type="password"
              fullWidth
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
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
              SIGN UP
              {loading ? (
                <CircularProgress className={classes.progress} size={20} />
              ) : null}
            </Button>
            <br />
            <small>
              Already have an account? Sign in <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: Proptypes.object.isRequired,
};

export default withStyles(styles)(Signup);
