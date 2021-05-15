import React, { useState } from "react";
import { Task } from "../../types";
import { useParams } from "react-router-dom";
import { useProject, useTeamMemberships } from "../../../../hooks/hooks";
import {
  PanelForm,
  PanelSection,
  PanelField,
} from "../../../../components/Panel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
  const initialState = {
    task,
    changed: false,
  };

  const [formValues, setFormValues] = useState(initialState);
  const [isEditing, setEditing] = useState(false);

  const toggleEditing = () => {
    setFormValues(initialState);
    setEditing(!isEditing);
  };

  const handleAssigneeChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    const assignedTo = event.target.value;
    const updates = formValues.task;
    setFormValues({
      task: { ...updates, assignedTo },
      changed: initialState.task.assignedTo !== assignedTo,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    const updates = formValues.task;
    setFormValues({
      task: { ...updates, title },
      changed: initialState.task.title !== title,
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const content = event.target.value;
    const updates = formValues.task;
    setFormValues({
      task: { ...updates, content },
      changed: initialState.task.content !== content,
    });
  };

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // add new comment - then merge to comments list
  };

  const handleSubmit = () => {
    const { id, key, updatedAt, seq, createdAt, ...updates } = formValues.task;
    onTaskUpdate(updates);
    toggleEditing();
  };

  const handleClose = () => {
    toggleEditing();
    onTaskToggle();
  };

  if (open) {
    return (
      <PanelForm
        title={"Task"}
        isEditing={isEditing}
        hasChanged={formValues.changed}
        toggleEditing={toggleEditing}
        ctaPrimaryText={"Save"}
        ctaSecondaryText={"Cancel"}
        onClose={handleClose}
        onSubmit={handleSubmit}
      >
        <PanelSection>
          <TaskKey>{formValues.task.key}</TaskKey>
        </PanelSection>
        <PanelSection>
          {isEditing ? (
            <PanelField
              fullWidth={true}
              onChange={handleTitleChange}
              onDoubleClick={toggleEditing}
              value={formValues.task.title}
              placeholder="Enter a name"
            />
          ) : (
            <Title onDoubleClick={toggleEditing}>{formValues.task.title}</Title>
          )}
        </PanelSection>

        <PanelSection>
          <StyledAssignedTo className="inline">
            <h3>Assigned to:</h3>
            {isEditing ? (
              <StyledFormControl>
                <SelectAssignees
                  value={
                    formValues.task.assignedTo ? formValues.task.assignedTo : ""
                  }
                  onChange={handleAssigneeChange}
                />
              </StyledFormControl>
            ) : (
              <span>{formValues.task.assignedTo}</span>
            )}
          </StyledAssignedTo>
          <div className="inline">
            <h3>Created:</h3>
            <span>
              {dayjs(formValues.task.createdAt).format("dddd, MMMM D YYYY")}
            </span>
          </div>
        </PanelSection>
        <PanelSection>
          <h3>Description</h3>
          <Description onDoubleClick={toggleEditing}>
            {isEditing ? (
              <StyleTextArea
                defaultValue={formValues.task.content}
                maxRows={3}
                maxLength={120}
                onChange={handleDescriptionChange}
                placeholder="Enter a description"
              />
            ) : (
              <p>{formValues.task.content}</p>
            )}
          </Description>
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
      </PanelForm>
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
    <Select
      className="field"
      displayEmpty
      value={value ? value : ""}
      onChange={onChange}
    >
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

const Title = styled.div`
  font-family: ProximaNova-Bold;
  font-size: var(--p16);
  margin: var(--p16) 0 var(--p24);
`;

const TaskKey = styled.div`
  font-family: ProximaNovaA-Bold;
  font-size: var(--p16);
  color: var(--blue8);
  text-transform: uppercase;
  margin-top: var(--p24);
`;

const Description = styled.div`
  min-height: var(--p48);
`;

const AttachmentRegion = styled.div`
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

const StyledFormControl = styled(FormControl)`
  .field > div {
    padding: var(--p4) var(--p8);
    width: var(--p192);
    color: var(--gray10);
  }

  .field fieldset {
    border: 1px solid var(--gray1);
  }
`;

const StyledAssignedTo = styled.div`
  display: flex;
  align-items: center;
  h3 {
    min-width: var(--p96);
  }
`;
