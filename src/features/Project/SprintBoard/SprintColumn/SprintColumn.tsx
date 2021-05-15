import React from "react";
import Paper from "@material-ui/core/Paper";
import { Droppable } from "react-beautiful-dnd";
import { SprintTask } from "../SprintTask";
import { Column, Task, TaskDict } from "../../types";
import { ColumnHeader } from "./Header";
import styled from "styled-components";

interface Props {
  column: Column;
  columnKey: string;
  taskDict: TaskDict;
  onAddTask: (task: string) => void;
  onTaskClick: (task: Task) => void;
}

export const SprintColumn = ({
  column,
  taskDict,
  columnKey,
  onAddTask,
  onTaskClick,
}: Props) => {
  const renderTasks = () => {
    if (column.taskIds.length > 0) {
      return column.taskIds.map((key, index) => (
        <div key={taskDict[key].id} onClick={() => onTaskClick(taskDict[key])}>
          <SprintTask task={taskDict[key]} index={index} />
        </div>
      ));
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
              <div ref={innerRef} {...droppableProps} {...isDraggingOver}>
                {Object.keys(taskDict).length > 0 && renderTasks()}
                {placeholder}
              </div>
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
