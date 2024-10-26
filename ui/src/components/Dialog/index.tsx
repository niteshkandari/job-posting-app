import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogPropsType = {
    title: string;
    message: string;
    isOpen:boolean;
    onCancel:Function | any;
    onAccept:Function | any;
}

export default function AlertDialog(props:AlertDialogPropsType) {
  const { title, message, isOpen , onAccept, onCancel } = props;


  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>cancel</Button>
          <Button color={"error"} onClick={onAccept} autoFocus>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
