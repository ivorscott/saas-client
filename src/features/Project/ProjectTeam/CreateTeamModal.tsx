import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const CreateTeamModal = ({
  isOpen,
  onClose,
  onCreate,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (team: string) => void;
}) => {
  const [team, setTeam] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const team = event.target.value;
    setTeam(team);
  };

  return (
    <Dialog
      data-test="component-invite-modal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Create team</DialogTitle>
      <DialogContent>
        <DialogContentText>
          A team is required before sending and invite.
        </DialogContentText>
        <DialogContentText>
          <TextField
            fullWidth={true}
            onChange={handleChange}
            placeholder="Your team name"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => onCreate(team)} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { CreateTeamModal };
