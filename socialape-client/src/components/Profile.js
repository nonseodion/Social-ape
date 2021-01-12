import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Link as MuiLink,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit,
  KeyboardReturn,
} from "@material-ui/icons";
import { uploadImage, logOutUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
import dayjs from "dayjs";

import EditDetails from "./EditDetails";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

class Profile extends Component {
  imageInput = React.createRef();

  handleImageUpload(event) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  }

  handleEditImage(event) {
    this.imageInput.current.click();
  }

  handleLogout = () => {
    this.props.logOutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { bio, imageUrl, createdAt, handle, location, website },
        loading,
        authenticated,
      },
    } = this.props;

    let ProfileMarkup = loading ? (
      <p>Loading...</p>
    ) : authenticated ? (
      <Paper className={classes.Paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image"></img>
            <input
              type="file"
              hidden
              ref={this.imageInput}
              onChange={this.handleImageUpload.bind(this)}
            />
            <Tooltip title="change profile picture" placement="top">
              <IconButton
                onClick={this.handleEditImage.bind(this)}
                className="button"
              >
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
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
          <Tooltip placement="top" title="logout">
            <IconButton onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.Paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            component={Link}
            color="primary"
            to="/signin"
          >
            Signin
          </Button>
          <Button
            variant="contained"
            component={Link}
            color="secondary"
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    );

    return ProfileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  logOutUser,
  uploadImage,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
