import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import { Memberships, Project } from "./types";
import styled from "styled-components";
import { MembersTable } from "./MembersTable";
import { useUpdateProject } from "../../hooks/project";
import { PanelForm, PanelSection, PanelField } from "../../components/Panel";
import { getUserInitials } from "../App/helpers";
import { Avatar } from "../../components/Avatar";

interface Actions {
  onClose: () => void;
}

interface Props extends Actions {
  open: boolean;
  project: Project;
  memberships: Memberships[] | undefined;
}

interface FormValues {
  project: Project;
  changed: boolean;
}

export const ProjectSettings = ({
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
  const toggleEditing = () => {
    setFormValues(initialState);
    setEditing(!isEditing);
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

  const handleClose = () => {
    toggleEditing();
    onClose();
  };

  if (open) {
    return (
      <PanelForm
        title={"Settings"}
        ctaPrimaryText="Save"
        ctaSecondaryText="Close"
        hasChanged={formValues.changed}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        onClose={handleClose}
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
              onChange={() => {}}
              color="secondary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div>
            <span>Public</span>
            <Switch
              onChange={() => {}}
              color="secondary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </PanelSection>
        <PanelSection>
          <h3>Team Members</h3>

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

const StyledAvatars = styled(IconButton)`
  background: var(--gray1);
  color: var(--gray4);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: var(--p64);
  height: var(--p64);
  text-align: center;
  font-size: var(--p12);
  margin: 0 var(--p4);
  text-transform: uppercase;
`;

const StyledImage = styled.img`
  width: var(--p64);
  height: var(--p64);
  border-radius: 50px;
  margin: var(--p4);
  cursor: pointer;
`;
