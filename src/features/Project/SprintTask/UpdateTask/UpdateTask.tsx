import React, { useState } from "react";
import { useProject, useTeamMemberships } from "../../hooks";
import { useParams } from "react-router-dom";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import { Task } from "../../types";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";
import dayjs from "dayjs";

interface Actions {
  onTaskDelete: () => void;
  onTaskToggle: () => void;
  onTaskUpdate: (values: any) => void;
}

interface Props extends Actions {
  open: boolean;
  task: Task;
}

export const UpdateTask = ({
  task,
  open,
  onTaskToggle,
  onTaskDelete,
  onTaskUpdate,
}: Props) => {
  const initialState = task;
  const [updatedTask, updateTask] = useState(initialState);
  const [isEditing, setEditing] = useState(false);

  const toggleEditing = () => {
    updateTask(initialState);
    setEditing(!isEditing);
  };

  const handleAssigneeChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    updateTask({ ...updatedTask, assignedTo: event.target.value });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTask({ ...updatedTask, title: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateTask({ ...updatedTask, content: event.target.value });
  };

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // add new comment - then merge to comments list
  };

  const handleSubmit = () => {
    const { id, key, updatedAt, seq, createdAt, ...updates } = updatedTask;
    onTaskUpdate(updatedTask);
    toggleEditing();
  };

  const handleClose = () => {
    toggleEditing();
    onTaskToggle();
  };

  if (open) {
    return (
      <PanelPosition>
        <PanelContainer className="shade3">
          <div>
            <TaskHeader>
              <StyleSettings>
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
            </TaskHeader>
            <TaskKey>{updatedTask.key}</TaskKey>
          </div>

          {isEditing ? (
            <TitleField
              fullWidth={true}
              onChange={handleTitleChange}
              value={updatedTask.title}
              placeholder="Enter a name"
            />
          ) : (
            <PanelTitle onDoubleClick={toggleEditing}>
              {updatedTask.title}
            </PanelTitle>
          )}
          <PanelSection>
            <StyledAssignedTo className="inline">
              <h3>Assigned to:</h3>
              {isEditing ? (
                <StyledFormControl>
                  <SelectAssignees
                    value={updatedTask.assignedTo ? updatedTask.assignedTo : ""}
                    onChange={handleAssigneeChange}
                  />
                </StyledFormControl>
              ) : (
                <span>{updatedTask.assignedTo}</span>
              )}
            </StyledAssignedTo>
            <div className="inline">
              <h3>Created:</h3>
              <span>{dayjs(task.createdAt).format("dddd, MMMM D YYYY")}</span>
            </div>
          </PanelSection>
          <PanelSection>
            <PanelDescription>
              <h3>Description</h3>
              {isEditing ? (
                <StyleTextArea
                  defaultValue={task.content}
                  maxRows={3}
                  maxLength={60}
                  onChange={handleDescriptionChange}
                  placeholder="Enter a description"
                />
              ) : (
                <p>{updatedTask.content}</p>
              )}
            </PanelDescription>
          </PanelSection>
          <PanelSection>
            <h3>Attachments</h3>
            <AttachmentRegion>
              <p>Add attachment</p>
            </AttachmentRegion>
          </PanelSection>
          <PanelSection>
            <h3>Comments</h3>
            <StyleTextArea
              maxRows={3}
              maxLength={60}
              onChange={handleNewCommentChange}
              placeholder="New comment"
            />
          </PanelSection>
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

const SelectAssignees = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: string }>) => void;
}) => {
  const params: { id: string } = useParams();
  const { data: project } = useProject(params.id);
  const { data, isError } = useTeamMemberships(project?.teamId);

  if (!data || isError) {
    return null;
  }
  return (
    <Select className="field" displayEmpty value={value} onChange={onChange}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {data.map((member) => (
        <MenuItem key={member.id} value={member.id}>
          {member.firstName + " " + (member.lastName || "")}
        </MenuItem>
      ))}
    </Select>
  );
};

const PanelPosition = styled.div`
  position: absolute;
  top: var(--p64);
  right: 0;
  right: 0;
  z-index: 2;
`;

const PanelContainer = styled.div`
  width: var(--p512);
  height: calc(100vh + var(--p16));
  padding: var(--p32);
  background: var(--white1);
`;

const PanelTitle = styled.div`
  font-family: ProximaNova-Bold;
  font-size: var(--p16);
  margin: var(--p16) 0 var(--p24);
`;

const PanelDescription = styled.div``;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
`;
const TaskKey = styled.div`
  font-family: ProximaNovaA-Bold;
  font-size: var(--p16);
  color: var(--blue8);
  text-transform: uppercase;
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
  margin-bottom: var(--p24);
  h3 {
    font-family: ProximaNova-Semibold;
    color: var(--gray6);
  }
  .inline {
    display: flex;
    align-items: center;
    margin-bottom: var(--p24);
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

const AttachmentRegion = styled.div`
  padding: var(--p8);
  border: 1px solid var(--gray2);
  display: flex;
  justify-content: center;
  font-size: var(--p16);
  border-radius: 4px;
`;

const StyleTextArea = styled(TextareaAutosize)`
  font-family: ProximaNova-Regular;
  font-size: var(--p16);
  width: calc(100% - var(--p16));
  min-height: var(--p16);
  max-width: calc(100% - var(--p16));
  min-width: calc(100% - var(--p16));
  padding: var(--p16) var(--p8);
  border: 1px solid var(--gray2);
  border-radius: 4px;
  &:focus {
    outline: none;
    border: 1px solid var(--gray7);
  }
`;

const TitleField = styled(TextField)`
  margin: var(--p16) 0 var(--p16);

  & fieldset {
    border: none;
  }

  & input,
  input:focus {
    font-size: var(--p16);
    font-family: ProximaNova-Bold;
    border-radius: 4px;
    padding: 0 var(--p8);
  }
  & input {
    border: 1px solid var(--gray2);
  }
  & input:focus {
    outline: none;
    border: 1px solid var(--gray7);
  }
`;

const StyledFormControl = styled(FormControl)`
  .field > div {
    padding: var(--p8);
    width: var(--p192);
  }
`;

const StyledAssignedTo = styled.div`
  display: flex;
  align-items: center;
  h3 {
    min-width: var(--p96);
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin-left: var(--p4);
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
