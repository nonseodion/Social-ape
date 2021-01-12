import React, { Component } from "react";
import Proptypes from "prop-types";

//Redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

//MUI stuff
import { withStyles } from "@material-ui/core/styles";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const styles = {
  button: {
    float: "right",
  },
};

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  handleOpen;

  componentDidMount() {
    const { credentials } = this.props;

    this.mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { bio, location, website } = this.state;
    const userDetails = { bio, location, website };
    this.props.editUserDetails(userDetails);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Tooltip placement="top" title="Edit Your Details">
          <IconButton className={classes.button} onClick={this.handleOpen}>
            <Edit color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                fullWidth
                type="text"
                label="Bio"
                name="bio"
                placeholder="a short bio of yourself"
                multiline
                rows="3"
                onChange={this.handleChange}
                value={this.state.bio}
              />
              <TextField
                fullWidth
                type="text"
                label="Website"
                name="website"
                placeholder="Your professional/personal website"
                onChange={this.handleChange}
                value={this.state.website}
              />

              <TextField
                fullWidth
                type="text"
                label="Location"
                name="location"
                placeholder="where do you live?"
                onChange={this.handleChange}
                value={this.state.location}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

const mapDispatchToProps = {
  editUserDetails,
};

EditDetails.propTypes = {
  credentials: Proptypes.object.isRequired,
  classes: Proptypes.object.isRequired,
  editUserDetails: Proptypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDetails));
