import React, { useEffect, useState } from "react";
import StaticProfile from "../components/profile/StaticProfile";
import { useParams } from "react-router-dom";
import Scream from "../components/scream/Scream";
import axios from "axios";
import ScreamSkeleton from "../utils/ProfileSkeleton";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
//MUI
import { Grid } from "@material-ui/core";

function User() {
  const { handle, screamId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const screams = useSelector((state) => state.data.screams);
  const [profile, setProfile] = useState(null);

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

  let screamsMarkup;
  if (loading) {
    screamsMarkup = <p>Loading Data...</p>;
  } else if (screams === null) {
    screamsMarkup = <p>No Screams from this user</p>;
  } else {
    if (!screamId) {
      screamsMarkup = screams.map((scream, index) => (
        <Scream key={scream.screamId} scream={scream} />
      ));
    } else {
      screamsMarkup = screams.map((scream, index) => (
        <Scream key={scream.screamId} scream={scream} openDialog={screamId} />
      ));
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ScreamSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

export default User;
