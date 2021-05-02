import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RootState } from "../../../../store";

interface Actions {
  onAddTask: (task: string) => void;
}

interface Props {
  task: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  isEditing: boolean;
}

const Task = ({
  task,
  isEditing,
  onClick,
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
          <div onClick={onClick}>close</div>
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={onClick}>
        <Add color="secondary" />
        <p color="secondary">
          <strong>Add Task</strong>
        </p>
      </div>
    );
  }
};

const AddTask: React.FC<Actions> = ({ onAddTask }) => {
  const [isEditing, setEditing] = useState(false);
  const { selected } = useSelector((state: RootState) => state.project);
  const [task, setTask] = useState("");

  const handleClick = () => {
    setEditing(!isEditing);
  };

  const handleSubmit = () => {
    setEditing(!isEditing);
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
      onClick={handleClick}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEditing={isEditing}
    />
  );
};

export { AddTask };
