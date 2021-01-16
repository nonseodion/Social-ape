import React, { Component } from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { markNotificationsRead } from "../../redux/actions/userActions";
import { connect } from "react-redux";
//MUI
import {
  Notifications as NotificationsIcon,
  Chat,
  Favorite,
} from "@material-ui/icons";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  Badge,
} from "@material-ui/core";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    const unreadNotifications = this.props.notifications.filter(
      (not) => !not.read
    );
    const unreadNotificationIds = unreadNotifications.map(
      (not) => not.notificationId
    );

    this.props.markNotificationsRead(unreadNotificationIds);
  };

  render() {
    const { notifications } = this.props;
    let notificationsIcon = <NotificationsIcon />;
    const unreadNotifications = notifications.filter((not) => !not.read).length;
    dayjs.extend(relativeTime);

    let notificationItems;
    notifications && notifications.length > 0 ? (
      (notificationItems = notifications.map((not) => {
        const notColor = not.read ? "primary" : "secondary";
        const time = dayjs(not.createdAt).fromNow();
        const verb = not.type === "like" ? "liked" : "commented on";
        const notIcon =
          not.type === "like" ? (
            <Favorite color={notColor} style={{ marginRight: 10 }} />
          ) : (
            <Chat color={notColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem onClick={this.handleClose} key={not.createdAt}>
            {notIcon}
            <Typography
              component={Link}
              to={`/users/${not.receiver}/screams/${not.screamId}`}
              variant="body2"
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      }))
    ) : (
      <MenuItem>You have no notifications</MenuItem>
    );

    if (notifications && unreadNotifications > 0) {
      notificationsIcon = (
        <Badge
          badgeContent={unreadNotifications}
          color="secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <NotificationsIcon />
        </Badge>
      );
    }

    return (
      <>
        <Tooltip
          placement="top"
          title="notifications"
          onClick={this.handleClick}
        >
          <IconButton>{notificationsIcon}</IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationItems}
        </Menu>
      </>
    );
  }
}

Notifications.proptTypes = {
  notifications: Proptypes.object.isRequired,
  markNotificationsRead: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapActionsToProps = {
  markNotificationsRead,
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
