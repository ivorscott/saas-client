import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface Props {
  open: boolean;
  onContinue: () => void;
}

class Modal extends React.Component<Props, {}> {
  handleContinue = () => {
    const { onContinue } = this.props;
    onContinue && onContinue();
  };

  render() {
    const { open } = this.props;
    return (
      <Dialog
        data-test="component-projects-modal"
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Welcome Freelancer!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            DevPie Client requires an existing Freshbooks account. Freshbooks is
            accounting software for freelancers.
          </DialogContentText>

          <DialogContentText>
            You will need to Sign into your Freshbooks account or create one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleContinue}
            color="secondary"
            autoFocus={true}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export { Modal };