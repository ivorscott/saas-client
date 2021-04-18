import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const InviteModal = ({
  isOpen,
  onClose,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const sendInvitation = () => {
    alert("invite");
  };

  return (
    <Dialog
      data-test="component-invite-modal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Header</DialogTitle>
      <DialogContent>
        <DialogContentText>Content</DialogContentText>

        <DialogContentText>More content</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={sendInvitation} color="secondary" autoFocus={true}>
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { InviteModal };
