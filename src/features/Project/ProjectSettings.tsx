import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { Memberships, Project, Team } from "./types";
import styled from "styled-components";
import { MembersTable } from "./MembersTable";
import { useDeleteProject, useUpdateProject } from "../../hooks/project";
import { useLeaveTeam } from "../../hooks/teams";
import { PanelForm, PanelSection, PanelField } from "../../components/Panel";
import { Avatar } from "../../components/Avatar";
import { history } from "../App/history";

interface Actions {
  onClose: () => void;
}

interface Props extends Actions {
  open: boolean;
  team: Team | undefined;
  project: Project;
  memberships: Memberships[] | undefined;
}

interface FormValues {
  project: Project;
  changed: boolean;
}

export const ProjectSettings = ({
  team,
  project,
  memberships,
  open,
  onClose,
}: Props) => {
  const initialState = {
    project,
    changed: false,
  };

  const [isEditing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [updateProject] = useUpdateProject();
  const [deleteProject] = useDeleteProject();
  const [leaveTeam] = useLeaveTeam();

  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const resetForm = () => {
    setFormValues(initialState);
    toggleEditing();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const name = event.target.value;
    const updates = formValues.project;

    setFormValues({
      project: { ...updates, name },
      changed: initialState.project.name !== name,
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    const description = event.target.value;
    const updates = formValues.project;

    setFormValues({
      project: { ...updates, description },
      changed: initialState.project.description !== description,
    });
  };

  const handleActiveStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const active = !formValues.project.active;
    const updates = formValues.project;

    setFormValues({
      project: { ...updates, active: active },
      changed: initialState.project.active !== active,
    });
  };

  const handlePublicStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const publicState = !formValues.project.public;
    const updates = formValues.project;

    setFormValues({
      project: { ...updates, public: publicState },
      changed: initialState.project.active !== publicState,
    });
  };

  const handleDelete = () => {
    deleteProject(project.id);
    setTimeout(() => history.push("/manage/projects"), 2000);
  };

  const handleSubmit = () => {
    setFormValues({
      project: formValues.project,
      changed: false,
    });

    const { prefix, userId, teamId, createdAt, updatedAt, ...updates } =
      formValues.project;

    updateProject(updates);
    toggleEditing();
  };

  const handleLeaveTeam = () => {
    const teamId = formValues.project.teamId;
    if (teamId) {
      leaveTeam(teamId);
    }
  };

  if (open) {
    return (
      <PanelForm
        title={"Settings"}
        ctaPrimaryText="Save"
        ctaSecondaryText="Close"
        hasChanged={formValues.changed}
        isEditing={isEditing}
        toggleEditing={resetForm}
        onClose={handleClose}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      >
        <PanelSection>
          <h3>Name</h3>
          {isEditing ? (
            <PanelField
              onChange={handleNameChange}
              value={formValues.project.name}
              placeholder="Enter a name"
            />
          ) : (
            <p>{project.name}</p>
          )}
        </PanelSection>
        <PanelSection>
          <h3>Description</h3>
          {isEditing ? (
            <PanelField
              fullWidth={true}
              onChange={handleDescriptionChange}
              value={formValues.project.description}
              placeholder="Enter a description"
            />
          ) : (
            <p>{project.description}</p>
          )}
        </PanelSection>
        <PanelSection>
          <h3>State and Visibility</h3>
          <div>
            <span>Active</span>
            <Switch
              onChange={handleActiveStateChange}
              checked={formValues.project.active}
              disabled={isEditing ? false : true}
              name="active"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div>
            <span>Public</span>
            <Switch
              onChange={handlePublicStateChange}
              checked={formValues.project.public}
              disabled={isEditing ? false : true}
              color="secondary"
              name="public"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </PanelSection>
        <PanelSection>
          {team && <h3>Team</h3>}

          {memberships && (
            <StyledMembers>
              {memberships.map((membership) => (
                <Avatar
                  key={membership.id}
                  alt="user avatar"
                  size="lg"
                  membership={membership}
                />
              ))}
            </StyledMembers>
          )}

          {team && (
            <TeamControls>
              <span className="developed-by">Developed By {team.name}</span>
              <span className="leave" onClick={handleLeaveTeam}>
                Leave team
              </span>
            </TeamControls>
          )}
        </PanelSection>

        {memberships && <MembersTable memberships={memberships} />}
      </PanelForm>
    );
  }
  return null;
};

const StyledMembers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const TeamControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--p32) var(--p8) 0;
  font-size: 14px;
  .developed-by {
    font-family: ProximaNova-Medium;
    color: var(--gray6);
  }
  .leave {
    color: var(--blue5);
    cursor: pointer;
  }
`;
