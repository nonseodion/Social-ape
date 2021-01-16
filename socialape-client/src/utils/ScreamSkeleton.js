import React from "react";
import PropTypes from "prop-types";
import noImg from "../images/no-img.png";

import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia } from "@material-ui/core";

const styles = (theme) => ({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
});

function ScreamSkeleton({ classes }) {
  const skeletons = Array.from({ length: 5 }).map((item, index) => (
    <Card key={index} className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={noImg}
        title="Profile picture"
      ></CardMedia>
      <CardContent className={classes.cardContent}>
        <div className={classes.date}></div>
        <div className={classes.handle}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.halfLine}></div>
      </CardContent>
    </Card>
  ));

  return skeletons;
}

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);
