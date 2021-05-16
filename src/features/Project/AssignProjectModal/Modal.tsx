import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useProjects } from "../../../hooks/project";
import styled from "styled-components";

interface Props {
  open: boolean;
  teamName: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export const Modal = ({ open, teamName, onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");

  const handleProjectChange = (event: React.ChangeEvent<{ value: string }>) => {
    event.preventDefault();
    const selectedProjected = event.target.value;
    setProject(selectedProjected);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(name);
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
          Add Project
        </StyledDialogTitle>
        <DialogContentText>
          Add a new or existing project to the team.
        </DialogContentText>
        <DialogContentText>
          <small className="team">{teamName}</small>
        </DialogContentText>
        <DialogContent>
          <Field
            fullWidth={true}
            onChange={handleChange}
            value={name}
            placeholder="Enter project name"
          />
        </DialogContent>

        <ProjectSelector teamName={teamName} onChange={handleProjectChange} />

        <StyledDialogActions>
          <Button
            className="opt-out"
            variant="contained"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Create
          </Button>
        </StyledDialogActions>
      </DialogContainer>
    </StyledDialog>
  );
};

const ProjectSelector = ({
  teamName,
  onChange,
}: {
  teamName: string;
  onChange: (event: React.ChangeEvent<{ value: string }>) => void;
}) => {
  const projects = useProjects();
  if (!projects.data || projects.data.length === 0) {
    return null;
  }
  return (
    <StyledFormControl fullWidth={true}>
      <DialogContentText>
        <span>Or choose existing project</span>
      </DialogContentText>

      <Select className="field" displayEmpty onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {projects.data.map((project) => (
          <MenuItem key={project.id} value={project.id ? project.id : ""}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)`
  margin-top: var(--p16);
  .field > div {
    padding: var(--p8);
  }
`;

const StyledDialog = styled(Dialog)`
  .modal {
    border-radius: var(--p8);
    max-height: none;
    position: fixed;
    top: 15%;
  }
  .team {
    font-family: ProximaNova-Bold;
  }
`;

const DialogContainer = styled.div`
  width: calc(var(--p384) - var(--p32) - var(--p32));
  padding: var(--p32);
`;

const DialogContent = styled.div`
  min-height: var(--p48);
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
