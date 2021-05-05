import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { RootState } from "../../../../shared/store";

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

const Task = ({
  task,
  isEditing,
  onClose,
  onChange,
  onKeyDown,
  onSubmit,
}: Props) => {
  if (isEditing) {
    return (
      <div>
        <TextField
          value={task}
          onChange={onChange}
          fullWidth={true}
          onKeyDown={onKeyDown}
          placeholder="Enter a title for this task"
        />
        <div>
          <Button color="secondary" variant="contained" onClick={onSubmit}>
            Save
          </Button>
          <div onClick={onClose}>close</div>
        </div>
      </div>
    );
  } else {
    return false;
  }
};

const AddTask: React.FC<AddTaskProps> = ({
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
    <Task
      task={task}
      onKeyDown={handleKeyDown}
      onClose={toggleEditing}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEditing={isEditing}
    />
  );
};

export { AddTask };
