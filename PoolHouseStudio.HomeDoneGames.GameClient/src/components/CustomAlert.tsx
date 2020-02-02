import Alert from "@material-ui/lab/Alert";
import React from "react";
import { AlertType } from "../models/enums/AlertType";

interface IAlertProps {
  type: AlertType;
  message: string;
}

const CustomAlert: React.FC<IAlertProps> = ({ type, message }) => {
  return <Alert severity="error">{message}</Alert>;
};

export default CustomAlert;
