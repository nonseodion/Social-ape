import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Link as MuiLink, Typography } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from "@material-ui/icons";
import dayjs from "dayjs";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.others,
});

function StaticProfile({ classes, profile = {} }) {
  const { bio, imageUrl, createdAt, handle, location, website } = profile;

  let ProfileMarkup = (
    <Paper className={classes.Paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image"></img>
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            variant="h5"
            color="primary"
            to={`users/${handle}`}
          >
            @{handle}
          </MuiLink>

          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" />
              <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />
          <span> Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );

  return ProfileMarkup;
}

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
