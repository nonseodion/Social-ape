import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Scream from "../components/Scream";

class Home extends Component {
  state = {
    screams: null,
  };

  componentDidMount() {
    axios
      .get("/screams")
      .then((res) => {
        this.setState({ screams: res.data });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const screams = this.state.screams ? (
      this.state.screams.map((scream, index) => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={5}>
        <Grid item xs={12} sm={8}>
          {screams}
        </Grid>
        <Grid item xs={12} sm={4}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
