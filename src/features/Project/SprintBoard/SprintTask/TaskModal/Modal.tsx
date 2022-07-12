import { SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { PanelField, PanelForm, PanelSection } from "components/Panel";
import dayjs from "dayjs";
import { useDeleteTask, useUpdateTask } from "hooks/board";
import React, { useState } from "react";
import { Task } from "types/board";

import { SelectAssignees } from "./Assignees";

export const TaskModal = ({
  data,
  open,
  onClose,
}: {
  open: boolean;
  data: { columnId: string; task: Task };
  onClose: () => void;
}) => {
  const initialState = data.task;
  const [formValues, setFormValues] = useState(initialState);
  const [changed, setChangedState] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [updateTask] = useUpdateTask();
  const [deleteTask] = useDeleteTask();

  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    const assignedTo = event.target.value;
    setFormValues({ ...formValues, assignedTo });
    setChangedState(initialState.assignedTo !== assignedTo);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setFormValues({ ...formValues, title });
    setChangedState(initialState.title !== title);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const content = event.target.value;
    setFormValues({ ...formValues, content });
    setChangedState(initialState.content !== content);
  };

  const handleNewCommentChange = () => {
    // add new comment - then merge to comments list
  };

  const handleDelete = () => {
    deleteTask({
      projectId: formValues.projectId,
      taskId: formValues.id,
      columnId: data.columnId,
    });
    handleClose();
  };

  const handleSubmit = () => {
    updateTask(formValues);
    setChangedState(false);
    toggleEditing();
  };

  const handleClose = () => {
    setFormValues(initialState);
    setEditing(false);
    setChangedState(false);
    onClose();
  };

  if (open) {
    return (
      <PanelForm
        title={"Task"}
        isEditing={isEditing}
        hasChanged={changed}
        toggleEditing={toggleEditing}
        ctaPrimaryText={"Save"}
        ctaSecondaryText={"Cancel"}
        onClose={handleClose}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      >
        <PanelSection>
          <TaskKey>{formValues.key}</TaskKey>
        </PanelSection>
        <PanelSection>
          {isEditing ? (
            <PanelField
              fullWidth={true}
              onChange={handleTitleChange}
              value={formValues.title}
              placeholder="Enter a name"
            />
          ) : (
            <Title className="noselect" onDoubleClick={toggleEditing}>
              {formValues.title}
            </Title>
          )}
        </PanelSection>

        <PanelSection>
          <StyledAssignedTo className="inline">
            <h3 className="noselect">Assigned to:</h3>
            <SelectAssignees
              isEditing={isEditing}
              formValues={formValues}
              toggleEditing={toggleEditing}
              onChange={handleAssigneeChange}
            />
          </StyledAssignedTo>
          <div className="inline">
            <h3 className="noselect">Created:</h3>
            <span>
              {dayjs(formValues.createdAt).format("dddd, MMMM D YYYY")}
            </span>
          </div>
        </PanelSection>
        <PanelSection>
          <h3 className="noselect">Description</h3>
          <Description>
            {isEditing ? (
              <StyleTextArea
                defaultValue={formValues.content}
                maxRows={3}
                maxLength={120}
                onChange={handleDescriptionChange}
                placeholder="Enter a description"
              />
            ) : (
              <div className="content" onDoubleClick={toggleEditing}>
                <p className="noselect">{formValues.content}</p>
              </div>
            )}
          </Description>
        </PanelSection>
        <PanelSection>
          <h3 className="noselect">Attachments</h3>
          <AttachmentRegion>
            <p className="noselect">Add attachment</p>
          </AttachmentRegion>
        </PanelSection>
        <PanelSection>
          <h3 className="noselect">Comments</h3>
          <StyleTextArea
            className="noselect"
            maxRows={3}
            maxLength={60}
            onChange={handleNewCommentChange}
            placeholder="New comment"
          />
        </PanelSection>
      </PanelForm>
    );
  }
  return null;
};

const Title = styled("div")`
  font-family: ProximaNova-Bold;
  font-size: var(--p16);
  margin: var(--p16) 0 var(--p24);
`;

const TaskKey = styled("div")`
  font-family: ProximaNovaA-Bold;
  font-size: var(--p16);
  color: var(--blue8);
  text-transform: uppercase;
  margin-top: var(--p24);
`;

const Description = styled("div")`
  .content {
    min-height: var(--p48);
  }
`;

const AttachmentRegion = styled("div")`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: var(--p8);
  border: 1px solid var(--gray2);
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
  background: var(--secondary);
  border: 1px solid var(--gray2);
  border-radius: 4px;
  color: var(--gray10);

  &:focus {
    outline: none;
    background: var(--white1);
  }
`;

const StyledAssignedTo = styled("div")`
  display: flex;
  align-items: center;
  h3 {
    min-width: var(--p96);
  }
`;
