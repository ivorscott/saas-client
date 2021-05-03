import React, { ReactElement } from "react";
import { SprintTask } from "../SprintTask";
import { AddTask } from "../SprintTask";
import { Badge, Paper } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import "./css.css";
import { Column, Task, TaskDict } from "../types";
import styled from "styled-components";

interface Actions {
  onAddTask: (task: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
  onDeleteTask: (columnKey: string, taskId: string) => void;
}

interface Props extends Actions {
  columnKey: string;
  column: Column;
  taskDict: TaskDict;
}

const ColumnTitle = styled.div`
  padding: var(--p8);
  font-size: var(--p18);
  font-family: ProximaNova-Bold;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
`;

const DroppableRegion = styled.div`
  height: 100%;
`;

const StyledColumn = styled.div`
  flex: 1;
`;

const Container = styled(Paper)`
  display: flex;
  flex: 1;
  max-width: var(--p414);
  margin-right: var(--p16);
  flex-direction: column;
  &:last-child {
    margin-right: 0;
  }
`;

const ColumnBadge = styled(Badge)`
  padding: var(--p8);
  border-radius: var(--p8);
`;

const SprintColumn = ({
  columnKey,
  column,
  taskDict,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: Props) => {
  const renderTasks = (dict: TaskDict, columnKey: string) => {
    if (Object.keys(column.taskIds).length > 0) {
      return column.taskIds.map((key: string, index) => {
        return (
          <SprintTask
            key={dict[key].id}
            columnKey={columnKey}
            task={dict[key]}
            index={index}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        );
      });
    }
    return <div></div>;
  };

  const badgeColor = column.columnName.split("-")[1];

  return (
    <Container>
      <ColumnTitle>
        <ColumnBadge className={`badge${badgeColor}`}>
          {column.title}
        </ColumnBadge>
      </ColumnTitle>

      {columnKey === "column-1" && <AddTask onAddTask={onAddTask} />}

      <Content>
        <StyledColumn>
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
                {Object.keys(taskDict).length > 0 &&
                  renderTasks(taskDict, columnKey)}
                {placeholder}
              </DroppableRegion>
            )}
          </Droppable>
        </StyledColumn>
      </Content>
    </Container>
  );
};

export { SprintColumn };
