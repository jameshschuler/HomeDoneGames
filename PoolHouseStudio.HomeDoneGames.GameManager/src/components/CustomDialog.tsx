import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { DialogType } from "../models/enums/DialogType";

interface CustomDialogProps {
  message: string;
  open?: boolean;
  title: string;
  type?: DialogType;
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
    <Dialog maxWidth="md" fullWidth={true} open={isOpen} onClose={handleClose}>
      <DialogTitle disableTypography={true}>
        <Typography variant="h4" className="error-dialog-title">
          <i className="fas fa-exclamation-circle"></i>
          {title || "Error!"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="h5">{message}</DialogContentText>
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
