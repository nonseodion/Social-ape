import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Signup
          </Button>
          <Button component={Link} to="/signin" color="inherit">
            Signin
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
