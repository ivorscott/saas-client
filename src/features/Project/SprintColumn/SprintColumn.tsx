import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import { AddTask } from "../SprintTask";
import { Droppable } from "react-beautiful-dnd";
import { SprintTask } from "../SprintTask";
import { Column, Task, TaskDict } from "../types";
import styled from "styled-components";

interface Actions {
  onAddTask: (task: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
  onDeleteTask: (columnKey: string, taskId: string) => void;
}

interface Props extends Actions {
  column: Column;
  columnKey: string;
  taskDict: TaskDict;
}

export const SprintColumn = ({
  columnKey,
  column,
  taskDict,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: Props) => {
  const badgeColor = column.columnName.split("-")[1];
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(!isEditing);

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

  return (
    <Container>
      <ColumnTitle>
        <ColumnBadge className={`badge${badgeColor}`}>
          {column.title}
        </ColumnBadge>

        {columnKey === "column-1" && (
          <CreateTaskButton onClick={toggleEditing}>
            <CreateIcon />
            <CreateTaskLabel>New Task</CreateTaskLabel>
          </CreateTaskButton>
        )}
      </ColumnTitle>

      {columnKey === "column-1" && (
        <AddTask
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          onAddTask={onAddTask}
        />
      )}

      <Content>
        <StyledColumn className="hide-scrollbar">
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

const ColumnTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--p16) var(--p8) 0;
  font-size: var(--p16);
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
`;
const ColumnBadge = styled(Badge)`
  padding: var(--p8) var(--p8) var(--p4);
  border-radius: var(--p8);
  color: var(--gray7);
`;
const CreateTaskButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--gray6);
  cursor: pointer;
`;

const CreateIcon = styled(Add)`
  color: var(--gray6);
`;
const CreateTaskLabel = styled.span`
  padding: var(--p8);
  font-size: var(--p16);
  font-family: ProximaNova-Regular;
`;
