import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { UsersTable } from "./UsersTable";
import { useDeleteProject, useUpdateProject } from "../../hooks/project";
import { PanelForm, PanelSection, PanelField } from "../../components/Panel";
import { Avatar } from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import { User, Project } from "../../types";

interface Actions {
  onClose: () => void;
}

interface Props extends Actions {
  open: boolean;
  project: Project;
  users: User[] | undefined;
}

interface FormValues {
  project: Project;
  changed: boolean;
}

export const ProjectSettings = ({ project, users, open, onClose }: Props) => {
  const initialState = {
    project,
    changed: false,
  };

  const [isEditing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [updateProject] = useUpdateProject();
  const [deleteProject] = useDeleteProject();
  const navigate = useNavigate();

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
      changed: initialState.project.public !== publicState,
    });
  };

  const handleDelete = () => {
    deleteProject(project.id);
    setTimeout(() => navigate("/manage/projects"), 2000);
  };

  const handleSubmit = () => {
    setFormValues({
      project: formValues.project,
      changed: false,
    });

    const { prefix, userId, createdAt, updatedAt, ...updates } =
      formValues.project;

    updateProject(updates);
    toggleEditing();
  };

  const badgeColor = (index: number) => (index % 9) + 1;

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
          <SwitchFields>
            <div>
              <span>Active</span>
              <Switch
                onChange={handleActiveStateChange}
                checked={formValues.project.active}
                disabled={!isEditing}
                color="primary"
                name="active"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <div>
              <span>Public</span>
              <Switch
                onChange={handlePublicStateChange}
                checked={formValues.project.public}
                disabled={!isEditing}
                color="primary"
                name="public"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </SwitchFields>
        </PanelSection>
        <PanelSection>
          {users && (
            <StyledUsers>
              {users.map((user, index) => (
                <Avatar
                  key={user.id}
                  alt="user avatar"
                  size="lg"
                  badgeColor={`badge${badgeColor(index)}`}
                  user={user}
                />
              ))}
            </StyledUsers>
          )}
        </PanelSection>

        {users && <UsersTable users={users} />}
      </PanelForm>
    );
  }
  return null;
};

const StyledUsers = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SwitchFields = styled("div")`
  display: flex;
  flex-direction: column;
  padding: var(--p14);
`;
