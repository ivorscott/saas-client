import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { history } from "../../../shared/history";
import { client } from "../../../services/APIService";
import { Params, Project, Team } from "../types";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export const InviteModal = ({
  isOpen,
  onClose,
  onInvite,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (emailList: string[]) => void;
}) => {
  const [emailList, setEmail] = useState([""]);
  const params: Params = useParams();

  const { data: selected, error } = useQuery<Project, AxiosError>(
    "project",
    async () => await client.get(`/projects/${params.id}`)
  );

  if (error) {
    history.push("/manage/projects");
  }

  const { data: team } = useQuery<Team, AxiosError>(
    "team",
    async () => await client.get(`/users/teams/${selected?.teamId}`)
  );

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
        <DialogContentText>
          New members will join {team?.name}
        </DialogContentText>

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
