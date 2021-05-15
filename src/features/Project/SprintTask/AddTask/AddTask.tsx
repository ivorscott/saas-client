import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Params, Project } from "../../types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { client } from "../../../../services/APIService";
import { useParams } from "react-router";
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
          maxRows={3}
          maxLength={60}
          onChange={onChange}
          placeholder="Describe the task"
        />
        <Controls>
          <CloseButton
            className="opt-out"
            variant="contained"
            onClick={onClose}
          >
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

export const AddTask = ({
  isEditing,
  toggleEditing,
  onAddTask,
}: AddTaskProps) => {
  const params: Params = useParams();
  const { data: selected } = useQuery<Project, AxiosError>(
    ["project", params.id],
    async () => await client.get(`/projects/${params.id}`)
  );

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
  font-family: ProximaNova-Regular;
  font-size: var(--p16);
  margin: var(--p8);
  width: calc(100% - var(--p32));
  min-height: var(--p16);
  max-width: calc(100% - var(--p32));
  min-width: calc(100% - var(--p32));
  background: var(--gray1);
  padding: var(--p16) var(--p8);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  &:focus {
    outline: none !important;
    background: var(--white1);
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
  &.opt-out {
    background: var(--gray1);
  }
  &:hover {
    background: var(--gray2);
  }
`;
