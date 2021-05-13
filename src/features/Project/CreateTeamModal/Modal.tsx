import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useProjects } from "../hooks";

interface Props {
  open: boolean;
  withProjects: boolean;
  onClose: () => void;
  onSubmit: (team: string) => void;
}

export const Modal = ({ open, withProjects, onClose, onSubmit }: Props) => {
  const [team, setTeam] = useState("");
  const [project, setProject] = useState("");

  const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const team = event.target.value;
    setTeam(team);
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedProjected = event.target.value;
    setProject(selectedProjected);
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
          Create Team
        </StyledDialogTitle>

        <DialogContentText>Team name</DialogContentText>
        <DialogContent>
          <Field
            fullWidth={true}
            onChange={handleTeamChange}
            placeholder="Enter a name"
          />
          {withProjects && <ProjectSelector onChange={handleProjectChange} />}
        </DialogContent>
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
            Create
          </Button>
        </StyledDialogActions>
      </DialogContainer>
    </StyledDialog>
  );
};

const ProjectSelector = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const projects = useProjects();
  if (!projects.data || projects.data.length === 0) {
    return null;
  }
  return (
    <StyledFormControl fullWidth={true}>
      <DialogContentText>
        <span>
          Project <small>(Optional)</small>
        </span>
      </DialogContentText>

      <Select className="field" displayEmpty onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {projects.data.map((project, idx) => (
          <MenuItem value={`${idx}0`}>{project.name}</MenuItem>
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

const DialogContainer = styled.div`
  width: calc(var(--p384) - var(--p32) - var(--p32));
  padding: var(--p32);
`;

const DialogContent = styled.div`
  min-height: var(--p96);
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

const StyledFormControl = styled(FormControl)`
  margin-top: var(--p16);
  .field > div {
    padding: var(--p8);
  }
`;
