import { IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";

export interface IDialogTitleProps {
  children: any;
  onClose: () => void;
}
const DialogTitle = (props: IDialogTitleProps) => {
  const { children, onClose } = props;
  return (
    <MuiDialogTitle id="customized-dialog-title" disableTypography={true}>
      {children}
      {onClose ? (
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default DialogTitle;
