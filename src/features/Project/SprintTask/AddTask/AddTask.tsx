import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextareaAutosize } from "@material-ui/core";
import { RootState } from "../../../../shared/store";
import styled from "styled-components";

interface AddTaskProps {
  isEditing: boolean;
  toggleEditing: () => void;
  onAddTask: (task: string) => void;
}

interface Props {
  task: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  isEditing: boolean;
}

const Component = ({ task, isEditing, onClose, onChange, onSubmit }: Props) => {
  if (isEditing) {
    return (
      <div>
        <StyleTextArea
          value={task}
          rowsMax={3}
          maxLength={60}
          onChange={onChange}
          placeholder="Describe the task"
        />
        <Controls>
          <CloseButton color="secondary" variant="contained" onClick={onClose}>
            Close
          </CloseButton>
          <SaveButton color="primary" variant="contained" onClick={onSubmit}>
            Save
          </SaveButton>
        </Controls>
      </div>
    );
  } else {
    return null;
  }
};

export const AddTask: React.FC<AddTaskProps> = ({
  isEditing,
  toggleEditing,
  onAddTask,
}) => {
  const { selected } = useSelector((state: RootState) => state.project);
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    toggleEditing();
    if (selected) {
      onAddTask(task);
      setTask("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(event.target.value);
  };

  return (
    <Component
      task={task}
      onKeyDown={handleKeyDown}
      onClose={toggleEditing}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEditing={isEditing}
    />
  );
};

const StyleTextArea = styled(TextareaAutosize)`
  font-family: ProximaNovaA-Medium;
  font-size: var(--p16);
  margin: var(--p8);
  width: calc(100% - var(--p34));
  max-width: calc(100% - var(--p34));
  min-width: calc(100% - var(--p34));
  background: var(--secondary);
  padding: var(--p8);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  &:focus {
    outline: none !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24), 0 1px 3px rgba(0, 0, 0, 0.12) !important;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 var(--p8) var(--p8);
`;

const SaveButton = styled(Button)`
  font-family: ProximaNova-Bold;
`;
const CloseButton = styled(Button)`
  font-family: ProximaNova-Bold;
  color: var(--gray4);
  &:hover {
    background: var(--gray2);
  }
`;
