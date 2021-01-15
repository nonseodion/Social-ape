import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import StaticProfile from "../components/profile/StaticProfile";
import { useParams } from "react-router-dom";
import Scream from "../components/scream/Scream";
import axios from "axios";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
//MUI
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

function User({ classes }) {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const screams = useSelector((state) => state.data.screams);
  const { profile, setProfile } = useState(null);

  useEffect(() => {
    if (profile === null) {
      dispatch(getUserData(handle));
      axios
        .get(`/user/${handle}`)
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((err) => console.log(err));
    }
  });

  const screamsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : screams === null ? (
    <p>No Screams from this user</p>
  ) : (
    screams.map((scream, index) => (
      <Scream key={scream.screamId} scream={scream} />
    ))
  );

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <StaticProfile profile={profile} />
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  classes: Proptypes.object.isRequired,
};

export default withStyles(styles)(User);
