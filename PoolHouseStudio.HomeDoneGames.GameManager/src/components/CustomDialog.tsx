import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";

interface CustomDialogProps {
  message: string;
  open?: boolean;
  title: string;
  type?: any;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  message,
  open,
  title,
  type
}) => {
  const [isOpen, setIsOpen] = useState(open || false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog maxWidth="lg" open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
