import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTeams } from "../../../hooks/teams";
import styled from "styled-components";
import {SelectChangeEvent} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (team: string) => void;
}

export const Modal = ({ open, onClose, onSubmit }: Props) => {
  const [team, setTeam] = useState("");

  const handleTeamChange = (event: React.ChangeEvent<{ value: string }>) => {
    event.preventDefault();
    const team = event.target.value;
    setTeam(team);
  };

  const handleExistingTeamChange = (
      event: SelectChangeEvent
  ) => {
    event.preventDefault();
    const teamId = event.target.value;
    setTeam(teamId);
  };

  return (
    <StyledDialog
      data-test="component-projects-modal"
      open={open}
      classes={{ paper: "modal" }}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContainer>
        <StyledDialogTitle id="responsive-dialog-title">
          Assign Team
        </StyledDialogTitle>
        <DialogContentText>Add a new team to the project.</DialogContentText>
        <DialogContent>
          <Field
            fullWidth={true}
            onChange={handleTeamChange}
            placeholder="Enter a name"
          />
        </DialogContent>

        <TeamsSelector onChange={handleExistingTeamChange} />

        <StyledDialogActions>
          <Button
            className="opt-out"
            variant="contained"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => onSubmit(team)}
            color="primary"
          >
            Assign
          </Button>
        </StyledDialogActions>
      </DialogContainer>
    </StyledDialog>
  );
};

const TeamsSelector = ({
  onChange,
}: {
  onChange: (event: SelectChangeEvent, child: React.ReactNode) => void;
}) => {
  const teams = useTeams();
  if (!teams.data || teams.data.length === 0) {
    return null;
  }
  return (
    <StyledFormControl fullWidth={true}>
      <DialogContentText>
        <span>Or choose an existing team.</span>
      </DialogContentText>

      <Select className="field" displayEmpty onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {teams.data.map((team) => (
          <MenuItem key={team.id} value={team.id ? team.id : ""}>
            {team.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

const StyledDialog = styled(Dialog)`
  .modal {
    border-radius: var(--p8);
    max-height: none;
    position: fixed;
    top: 15%;
  }
`;

const StyledFormControl = styled(FormControl)`
  .field > div {
    padding: var(--p8);
  }
`;

const DialogContainer = styled.div`
  width: calc(var(--p384) - var(--p32) - var(--p32));
  padding: var(--p32);
`;

const DialogContent = styled.div`
  min-height: var(--p64);
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 0 0 var(--p32);
  h2 {
    font-family: ProximaNova-Bold;
    font-size: var(--p24);
  }
`;

const Field = styled(TextField)`
  background: var(--secondary);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  & fieldset {
    border: none;
  }
  & input {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    padding: var(--p8);
  }
  & input:focus {
    outline: none;
    border: none;
    background: var(--white1);
    border-radius: var(--p4);
  }
`;

const StyledDialogActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: var(--p32);
  button {
    width: 48%;
    padding: var(--p8);
    font-family: ProximaNova-Bold;
    font-size: var(--p16);
    text-transform: capitalize;
  }
  .opt-out {
    color: var(--gray4);
    background: var(--gray1);
    &:hover {
      color: var(--gray9);
      background: var(--gray2);
    }
  }
`;
