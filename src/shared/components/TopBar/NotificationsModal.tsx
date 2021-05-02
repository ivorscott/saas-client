import React from "react";
import {
  // Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store";

const NotificationsModal = ({
  isOpen,
  onClose,
  onInvite,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (emailList: string[]) => void;
}) => {
  return (
    <Dialog
      data-test="component-invite-modal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Notifications</DialogTitle>
      <DialogContent>
        <DialogContentText>test</DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          color="primary"
          autoFocus={true}
        >
          Invite
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export { NotificationsModal };
