import {
  withStyles,
  WithStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import DialogTitle from "./DialogTitle";
import { styles } from "./styles";

export interface Props extends WithStyles<typeof styles> {
  open: boolean;
  title: string;
  children: any;
  className?: string;
  callToActionText: string;
  callToActionColor: "primary" | "secondary";
  onClose: () => void;
  onSubmit: (data?: any) => void;
}

const Modal = withStyles(styles)(
  class Component extends React.Component<Props> {
    render() {
      const {
        open,
        title,
        classes,
        children,
        className,
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
          PaperProps={{
            classes: {
              root: className ? className : classes.paperWidth,
            },
          }}
          {...props}
        >
          <DialogTitle classes={classes} onClose={onClose}>
            <Typography className={classes.title} variant="h1">
              {title}
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.content}>{children}</DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              cancel
            </Button>
            <Button onClick={onSubmit} color={callToActionColor}>
              {callToActionText}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
);
export { Modal };
