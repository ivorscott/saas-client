import React, { useState } from "react";
import { initialize } from "redux-form";
import { UpdateTask } from "./UpdateTask";
import { Typography, withStyles, WithStyles } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../types";
import { styles } from "./styles";
import { useDispatch } from "react-redux";

interface Actions {
  onDeleteTask: (columnKey: string, taskId: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
}

interface ParentProps extends Actions {
  task: Task;
  index: number;
  columnKey: string;
}

interface Props extends WithStyles<typeof styles> {
  task: Task;
  open: boolean;
  index: number;
  onTaskToggle: () => void;
  onTaskDelete: () => void;
  onTaskUpdate: (values: any) => void;
}

const Component = withStyles(styles)(
  ({
    open,
    task,
    index,
    classes,
    onTaskToggle,
    onTaskUpdate,
    onTaskDelete,
  }: Props) => {
    return (
      <div data-test="component-task">
        <Draggable draggableId={task.id} index={index}>
          {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
            <div
              className={classes.task}
              ref={innerRef as any}
              onClick={onTaskToggle}
              {...isDragging}
              {...draggableProps}
              {...dragHandleProps}
            >
              <Typography variant="body1">{task.title}</Typography>
            </div>
          )}
        </Draggable>
        <UpdateTask
          open={open}
          task={task}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
          onTaskToggle={onTaskToggle}
        />
      </div>
    );
  }
);

const SprintTask: React.FC<ParentProps> = ({
  columnKey,
  task,
  index,
  onDeleteTask,
  onUpdateTask,
}) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTaskToggle = () => {
    dispatch(initialize("update_task_form", task));
    setOpen(!isOpen);
  };

  const handleTaskDelete = () => {
    onDeleteTask(columnKey, task.id);
  };

  const handleTaskUpdate = (values: any) => {
    onUpdateTask(columnKey, { ...task, ...values });
    setOpen(!isOpen);
  };

  return (
    <Component
      open={isOpen}
      task={task}
      index={index}
      onTaskToggle={handleTaskToggle}
      onTaskDelete={handleTaskDelete}
      onTaskUpdate={handleTaskUpdate}
    />
  );
};

export { SprintTask };
