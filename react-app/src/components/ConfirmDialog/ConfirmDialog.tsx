import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type props = {
  /** Open dialog button text */
  buttonText: string;
  /** Title of dialog */
  dialogTitle: string;
  /** Body text of dialog */
  dialogText: string;
  /** Function, that will be call after click agree button */
  agreeAction(): void;
};

export function ConfirmDialog(props: props): JSX.Element {
  const [open, setOpen] = useState(false);

  /** Open dialog */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /** Close dialog */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="secondary" onClick={handleClickOpen} variant="contained" fullWidth>
        {props.buttonText}
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleClose();
              props.agreeAction();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
