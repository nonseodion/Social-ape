import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Link as MuiLink, Typography, Button } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit,
  KeyboardReturn,
} from "@material-ui/icons";
import { uploadImage, logOutUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import dayjs from "dayjs";

import EditDetails from "./EditDetails";
import MyButton from "../../utils/MyButton";
import ProfileSkeleton from "../../utils/ProfileSkeleton";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.others,
});

class Profile extends Component {
  imageInput = React.createRef();

  handleImageUpload(event) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  }

  handleEditImage = (event) => {
    this.imageInput.current.click();
  };

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
      <ProfileSkeleton />
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
            <MyButton
              tip="change profile picture"
              handleClick={this.handleEditImage}
              btnClassName="button"
            >
              <Edit color="primary" />
            </MyButton>
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
          <MyButton tip="logout" handleClick={this.handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
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
