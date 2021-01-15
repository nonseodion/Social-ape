import React from "react";
import Proptypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//MUI stuff
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  ...theme.others,
  commentImage: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
  },
  commentData: {
    marginLeft: 20,
  },
});

function Comments({ comments, classes }) {
  const commentsMarkup = (
    <>
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, imageUrl, userHandle } = comment;
          return (
            <Grid container key={createdAt}>
              <hr className={classes.visibleSeparator} />
              <Grid item sm={2}>
                <img
                  alt="profile"
                  src={imageUrl}
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    component={Link}
                    to={`/users/${userHandle}`}
                    variant="h5"
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{body}</Typography>
                </div>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  return commentsMarkup;
}

Comments.propTypes = {
  comments: Proptypes.array.isRequired,
};

export default withStyles(styles)(Comments);
