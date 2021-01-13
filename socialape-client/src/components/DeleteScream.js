import React, { useState } from "react";
import Proptypes from "prop-types";
import MyButton from "../utils/MyButton";

//Redux stuff
import { deleteScream } from "../redux/actions/dataActions";
import { useDispatch } from "react-redux";

//MUI stuff
import { withStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const styles = {
  button: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
};

function DeleteScream({ screamId, classes }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteScream(screamId));
    handleClose();
  };

  return (
    <>
      <MyButton
        handleClick={handleOpen}
        tip="Delete Scream"
        tipClassName={classes.button}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleDelete} color="secondary">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteScream.propTypes = {
  classes: Proptypes.object.isRequired,
};

export default withStyles(styles)(DeleteScream);
