import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import React from "react";
import DialogTitle from "./DialogTitle";

export interface Props {
  open: boolean;
  title: string;
  children: any;
  callToActionText: string;
  callToActionColor?: "primary" | "secondary";
  onClose: () => void;
  onSubmit: (data?: any) => void;
}

const Modal = class Component extends React.Component<Props> {
  render() {
    const {
      open,
      title,
      children,
      callToActionText,
      callToActionColor,
      onClose,
      onSubmit,
      ...props
    } = this.props;

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        {...props}
      >
        <DialogTitle onClose={onClose}>
          <p>{title}</p>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            cancel
          </Button>
          <Button onClick={onSubmit} color={callToActionColor || "secondary"}>
            {callToActionText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
export { Modal };
