import React from "react";
import PropTypes from "prop-types";
import noImg from "../images/no-img.png";

import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from "@material-ui/icons";

const styles = (theme) => ({
  ...theme.others,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10,
  },
});

function ProfileSkeleton({ classes }) {
  return (
    <Paper className={classes.Paper}>
      <div className={classes.profile}>
        <img src={noImg} alt="profile" className="profile-image"></img>
        <hr />
        <div className="profile-details">
          <div className={classes.handle}></div>
          <hr />
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <hr />
          <LocationOn color="primary" /> <span>location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
