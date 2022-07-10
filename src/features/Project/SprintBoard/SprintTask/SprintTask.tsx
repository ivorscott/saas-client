import React from "react";
import { Task, UserDict } from "../../types";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import { Avatar } from "../../../../components/Avatar";

export const SprintTask = ({
  users,
  task,
  index,
}: {
  users: UserDict | undefined;
  task: Task;
  index: number;
}) => {
  const badgeColor = (task.seq % 9) + 1;
  return (
    <div>
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
          <div
            ref={innerRef as any}
            {...draggableProps}
            {...dragHandleProps}
            style={getItemStyle(isDragging, draggableProps.style)}
          >
            <TaskHeader>
              <TaskKey>{task.key}</TaskKey>
              <TaskMeta>
                {task.points === 0 ? null : (
                  <StoryPoints>{task.points}</StoryPoints>
                )}
                <AssignedTo>
                  {users && task.assignedTo && (
                    <Avatar
                      key={task.assignedTo}
                      alt="user avatar"
                      size="sm"
                      badgeColor={`badge${badgeColor}`}
                      membership={users[task.assignedTo]}
                    />
                  )}
                </AssignedTo>
              </TaskMeta>
            </TaskHeader>
            <TaskTitle>{task.title}</TaskTitle>
          </div>
        )}
      </Draggable>
    </div>
  );
};

const TaskKey = styled("div")`
  font-family: ProximaNovaA-Bold;
  font-size: var(--p16);
  color: var(--blue8);
  text-transform: uppercase;
`;
const TaskTitle = styled("div")`
  font-family: ProximaNova-Medium;
  color: var(--gray6);
`;
const TaskHeader = styled("div")`
  display: flex;
  align-items: center;
  min-height: 40px;
  position: relative;
  margin-bottom: var(--p8);
  .dropdown {
    position: absolute;
    right: 0;
  }
`;
const TaskMeta = styled("div")`
  display: flex;
  align-items: center;
  margin-left: var(--p8);
`;
const StoryPoints = styled("div")`
  font-family: ProximaNova-Medium;
  height: var(--p32);
  width: var(--p32);
  display: flex;
  font-size: var(--p12);
  justify-content: center;
  align-items: center;
  background: var(--gray2);
  border-radius: 50px;
  margin: var(--p4) 0 var(--p4) var(--p4);
`;
const AssignedTo = styled("div")`
  font-family: ProximaNova-Semibold;

  display: flex;
  font-size: var(--p12);
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: var(--p4);
  padding: 1px;
`;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
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
