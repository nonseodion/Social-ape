import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import Proptypes from "prop-types";

//Redux stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const {
      data: { screams },
    } = this.props;

    const screamsMarkup = screams ? (
      screams.map((scream, index) => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={5}>
        <Grid item xs={12} sm={8}>
          {screamsMarkup}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getScreams,
};

Home.propTypes = {
  data: Proptypes.object.isRequired,
  getScreams: Proptypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
