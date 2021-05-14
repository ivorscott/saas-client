import React, { useState } from "react";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { Memberships, Project } from "./types";
import styled from "styled-components";
import { MembersTable } from "./MembersTable";
import { useUpdateProject } from "./hooks";
import { Button } from "@material-ui/core";

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
      <PanelPosition>
        <PanelContainer className="shade3">
          <div>
            <ProjectHeader>
              <StyleSettings>
                {formValues.changed && (
                  <ChangedText>
                    <span>Settings changed</span>
                  </ChangedText>
                )}
                <Edit
                  className={isEditing ? "selected" : ""}
                  onClick={toggleEditing}
                >
                  Edit
                </Edit>
                <StyledIconButton size="small">
                  <MoreHoriz />
                </StyledIconButton>
                <StyledIconButton size="small" onClick={handleClose}>
                  <Close fontSize="small" />
                </StyledIconButton>
              </StyleSettings>
            </ProjectHeader>
          </div>
          <PanelTitle>Settings</PanelTitle>
          <PanelSection>
            <h3>Name</h3>
            {isEditing ? (
              <Field
                fullWidth={true}
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
              <Field
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
                {memberships.map(({ id, picture, firstName, lastName }) => {
                  return picture ? (
                    <StyledImage key={id} src={picture} />
                  ) : (
                    <StyledAvatars key={id}>
                      {getInitials(firstName, lastName)}
                    </StyledAvatars>
                  );
                })}
              </StyledMembers>
            )}
          </PanelSection>

          {memberships && <MembersTable memberships={memberships} />}

          {isEditing && (
            <Controls>
              <CloseButton
                className="opt-out"
                variant="contained"
                onClick={toggleEditing}
              >
                Close
              </CloseButton>
              <SaveButton
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Save
              </SaveButton>
            </Controls>
          )}
        </PanelContainer>
      </PanelPosition>
    );
  }
  return null;
};

function getInitials(firstName: string, lastName: string) {
  return firstName.substring(0, 1) + (lastName || "").substring(0, 1);
}

const ChangedText = styled.div`
  font-size: var(--p14);
  display: flex;
  align-items: center;
  margin-right: var(--p8);
`;
const PanelPosition = styled.div`
  position: absolute;
  top: var(--p64);
  right: 0;
  right: 0;
  z-index: 2;
`;

const PanelContainer = styled.div`
  width: var(--p512);
  height: calc(100vh + var(--p16) + var(--p64) - var(--p32) - var(--p32));
  padding: var(--p32);
  background: var(--white1);
`;

const PanelTitle = styled.div`
  font-family: ProximaNova-Bold;
  font-size: var(--p24);
  margin: var(--p16) 0 var(--p16);
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StyleSettings = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-self: flex-start;
  color: var(--gray6);
  cursor: pointer;
`;

const PanelSection = styled.section`
  margin-bottom: var(--p16);
  h3 {
    font-family: ProximaNova-Semibold;
    color: var(--gray6);
  }
  .inline {
    display: flex;
    align-items: center;
    margin-bottom: var(--p16);
  }
  .inline h3 {
    margin: 0;
  }
  .inline span {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    color: var(--gray10);
    margin-left: var(--p4);
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
    padding: var(--p16) var(--p8);
  }
  & input:focus {
    outline: none;
    border: none;
    background: var(--white1);
    border-radius: var(--p4);
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin-left: var(--p4);
`;

//TODO: create reusable component

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

const Edit = styled.button`
  background: var(--gray1);
  color: var(--gray6);
  padding: var(--p4) var(--p12);
  border-radius: 4px;
  border-style: none;
  &:hover {
    background: var(--gray2);
    cursor: pointer;
  }
  &.selected {
    color: var(--white1);
    background: var(--primary);
    font-family: ProximaNova-Bold;
    padding: var(--p4) var(--p12);
    border-radius: 4px;
    border-style: none;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: var(--p24);
  button {
    margin: var(--p8);
    width: var(--p96);
  }
`;

const SaveButton = styled(Button)`
  font-family: ProximaNova-Bold;
`;

const CloseButton = styled(Button)`
  font-family: ProximaNova-Bold;
  color: var(--gray4);
  &.opt-out {
    background: var(--gray1);
  }
  &:hover {
    background: var(--gray2);
  }
`;
