import Add from "@mui/icons-material/Add";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { AddTask } from "../SprintTask";
import { Column } from "../../../../types";

export const ColumnHeader = ({
  column,
  columnKey,
  onAddTask,
}: {
  column: Column;
  columnKey: string;
  onAddTask: (task: string) => void;
}) => {
  const badgeColor = column.columnName.split("-")[1];
  const [isCreating, setIsCreating] = useState(false);
  const toggleCreating = () => setIsCreating(!isCreating);
  return (
    <Header>
      <div className="title">
        <span className={`badge badge${badgeColor}`}>{column.title}</span>

        {columnKey === "column-1" && (
          <div className="new-task-btn" onClick={toggleCreating}>
            <Add className="add-icon" />
            <span className="label">New Task</span>
          </div>
        )}
      </div>

      {columnKey === "column-1" && (
        <AddTask
          isCreating={isCreating}
          toggleCreating={toggleCreating}
          onAddTask={onAddTask}
        />
      )}
    </Header>
  );
};

const Header = styled("header")`
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--p16) var(--p8) 0;
    font-size: var(--p16);
    font-family: ProximaNova-Bold;
  }
  .badge {
    padding: var(--p8) var(--p8) var(--p4);
    border-radius: var(--p8);
    color: var(--gray7);
  }
  .new-task-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--gray6);
    cursor: pointer;
  }
  .add-icon {
    color: var(--gray6);
  }
  .label {
    padding: var(--p8);
    font-size: var(--p16);
    font-family: ProximaNova-Regular;
  }
`;
