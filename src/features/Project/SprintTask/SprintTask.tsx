import React, { useState } from "react";
import { initialize } from "redux-form";
import { UpdateTask } from "./UpdateTask";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../types";
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

interface Props {
  task: Task;
  open: boolean;
  index: number;
  onTaskToggle: () => void;
  onTaskDelete: () => void;
  onTaskUpdate: (values: any) => void;
}

const Component = ({
  open,
  task,
  index,
  onTaskToggle,
  onTaskUpdate,
  onTaskDelete,
}: Props) => {
  return (
    <div data-test="component-task">
      <Draggable draggableId={task.id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
          <div
            ref={innerRef as any}
            onClick={onTaskToggle}
            {...isDragging}
            {...draggableProps}
            {...dragHandleProps}
          >
            <p>{task.title}</p>
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
};

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
