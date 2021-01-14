import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import MyButton from "../../utils/MyButton";
import PostScream from "../scream/PostScream";

//MUI stuffs
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Home, Notifications } from "@material-ui/icons";

//Redux stuff
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    const navBarIcons = authenticated ? (
      <>
        <PostScream />
        <Link to="/">
          <MyButton tip="Home">
            <Home />
          </MyButton>
        </Link>
        <MyButton tip="Notifications">
          <Notifications />
        </MyButton>
      </>
    ) : (
      <>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/signup" color="inherit">
          Signup
        </Button>
        <Button component={Link} to="/signin" color="inherit">
          Signin
        </Button>
      </>
    );

    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">{navBarIcons}</Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: Proptypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
