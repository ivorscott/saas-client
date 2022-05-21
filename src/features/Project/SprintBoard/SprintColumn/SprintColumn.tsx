import React from "react";
import Paper from "@mui/material/Paper";
import { Droppable } from "react-beautiful-dnd";
import { SprintTask } from "../SprintTask";
import { Column, Task, TaskDict, UserDict } from "../../types";
import { ColumnHeader } from "./Header";
import styled from "styled-components";

interface Actions {
  onAddTask: (task: string) => void;
  onTaskClick: (columnId: string, task: Task) => void;
}

interface Props extends Actions {
  column: Column;
  users: UserDict | undefined;
  columnKey: string;
  taskDict: TaskDict;
}

export const SprintColumn = ({
  column,
  users,
  taskDict,
  columnKey,
  onAddTask,
  onTaskClick,
}: Props) => {
  const renderTasks = () => {
    if (column.taskIds.length > 0) {
      return column.taskIds.map((key, index) => {
        return (
          taskDict[key] && (
            <div
              key={taskDict[key].id}
              onClick={() => onTaskClick(column.id, taskDict[key])}
            >
              <SprintTask users={users} task={taskDict[key]} index={index} />
            </div>
          )
        );
      });
    }
    return null;
  };

  return (
    <StyledColumn>
      <ColumnHeader
        column={column}
        columnKey={columnKey}
        onAddTask={onAddTask}
      />

      <div className="content">
        <div className="content-body hide-scrollbar">
          <Droppable droppableId={columnKey}>
            {(
              { innerRef, droppableProps, placeholder },
              { isDraggingOver }
            ) => (
              <DroppableRegion
                ref={innerRef}
                {...droppableProps}
                {...isDraggingOver}
              >
                {Object.keys(taskDict).length > 0 && renderTasks()}
                {placeholder}
              </DroppableRegion>
            )}
          </Droppable>
        </div>
      </div>
    </StyledColumn>
  );
};

const StyledColumn = styled(Paper)`
  display: flex;
  max-width: var(--p384);
  margin: var(--p4) var(--p16) var(--p4) var(--p4);
  flex-direction: column;
  scrollbar-width: none;

  &:last-child {
    margin-right: var(--p4);
  }
  /* mobile first */
  @media only screen and (max-width: 600px) {
    flex: 0 0 70%;
  }
  @media only screen and (min-width: 600px) {
    flex: 0 0 40%;
  }
  @media only screen and (min-width: 1400px) {
    flex: 0 0 23%;
  }
  .content {
    display: flex;
    flex: 1;
    overflow: auto;
  }
  .content-body {
    flex: 1;
  }
`;

const DroppableRegion = styled.div`
  min-height: 100%;
`;
