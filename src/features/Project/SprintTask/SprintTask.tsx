import React, { useState } from "react";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { Task } from "../types";
import { CSSProperties } from "@material-ui/styles";
import { UpdateTask } from "./UpdateTask";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";

interface Actions {
  onDeleteTask: (columnKey: string, taskId: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
}

interface SprintTaskProps extends Actions {
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
  const badgeColor = (task.seq % 9) + 1;

  return (
    <div>
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
          <div
            ref={innerRef as any}
            onClick={onTaskToggle}
            {...draggableProps}
            {...dragHandleProps}
            style={getItemStyle(isDragging, draggableProps.style)}
          >
            <TaskHeader>
              <TaskKey>{task.key}</TaskKey>
              <TaskMeta>
                <StoryPoints>{task.points}</StoryPoints>
                <AssignedTo className={`badge${badgeColor}`}>
                  {"TS" || task.assignedTo}
                </AssignedTo>
              </TaskMeta>
              <StyleSettings>
                <MoreHoriz />
              </StyleSettings>
            </TaskHeader>
            <TaskTitle>{task.title}</TaskTitle>
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

const SprintTask: React.FC<SprintTaskProps> = ({
  columnKey,
  task,
  index,
  onDeleteTask,
  onUpdateTask,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleTaskToggle = () => {
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

const TaskKey = styled.div`
  font-family: ProximaNovaA-Bold;
  font-size: var(--p16);
  color: var(--blue8);
  text-transform: uppercase;
`;
const TaskTitle = styled.div`
  font-family: ProximaNovaA-Medium;
  color: var(--gray6);
`;
const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--p8);
`;
const TaskMeta = styled.div`
  display: flex;
  margin-left: var(--p8);
`;
const StoryPoints = styled.div`
  font-family: ProximaNova-Medium;
  height: var(--p24);
  width: var(--p24);
  display: flex;
  font-size: var(--p12);
  justify-content: center;
  align-items: center;
  background: var(--gray2);
  border-radius: 50px;
  border: 1px solid var(--gray6);
  margin: var(--p4);
`;
const AssignedTo = styled.div`
  font-family: ProximaNova-Semibold;
  height: var(--p24);
  width: var(--p24);
  display: flex;
  font-size: var(--p12);
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: var(--p4);
  padding: 1px;
`;

const StyleSettings = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-self: flex-start;
  color: var(--gray6);
  cursor: pointer;
`;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): CSSProperties => ({
  userSelect: "none",
  minHeight: "var(--p96)",
  padding: "var(--p8)",
  margin: "var(--p8)",
  borderRadius: "var(--p4)",
  boxShadow: isDragging
    ? "0 3px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.15)"
    : "0 2px 4px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.15)",
  background: isDragging ? "var(--yellow1)" : "var(--white1)",
  ...draggableStyle,
});
