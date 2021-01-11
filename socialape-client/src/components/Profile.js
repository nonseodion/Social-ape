import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = {};

class Profile extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
