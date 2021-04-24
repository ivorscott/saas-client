import React, { useState } from "react";
import { TextField } from "@material-ui/core";
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
  onInvite,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (emailList: string[]) => void;
}) => {
  const [emailList, setEmail] = useState([""]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setEmail([name]);
  };

  return (
    <Dialog
      data-test="component-invite-modal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Invite teammates</DialogTitle>
      <DialogContent>
        <DialogContentText>New members will join _____</DialogContentText>

        <DialogContentText>
          <TextField
            fullWidth={true}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => onInvite(emailList)}
          color="primary"
          autoFocus={true}
        >
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { InviteModal };
