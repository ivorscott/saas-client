import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RootState } from "../../../../store";
import classnames from "classnames";
import { styles } from "./styles";

interface Actions {
  onAddTask: (task: string) => void;
}

interface Props extends WithStyles<typeof styles> {
  task: string;
  classes: any;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  isEditing: boolean;
}

const Task = withStyles(styles)(
  ({
    task,
    isEditing,
    classes,
    onClick,
    onChange,
    onKeyDown,
    onSubmit,
  }: Props) => {
    if (isEditing) {
      return (
        <div className={classes.root}>
          <TextField
            value={task}
            className="mb-1"
            onChange={onChange}
            fullWidth={true}
            onKeyDown={onKeyDown}
            placeholder="Enter a title for this task"
          />
          <div className={classes.buttons}>
            <Button
              color="secondary"
              variant="contained"
              onClick={onSubmit}
              className={classes.save}
            >
              Save
            </Button>
            <div onClick={onClick} className="material-icons">
              close
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          onClick={onClick}
          className={classnames(classes.root, classes.addTask)}
        >
          <Add color="secondary" />
          <Typography color="secondary" variant="body1">
            <strong>Add Task</strong>
          </Typography>
        </div>
      );
    }
  }
);

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
