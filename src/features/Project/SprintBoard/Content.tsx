import React, { useState } from "react";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { SprintColumn } from "./SprintColumn";
import { Task, TaskDict, ColumnDict } from "../types";
import { TaskModal } from "./SprintTask/TaskModal";

interface BoardActions {
  onDragEnd: (result: DropResult) => void;
  onAddTask: (task: string) => void;
  // onDeleteTask: (columnKey: string, taskId: string) => void;
}

interface Props extends BoardActions {
  taskDict: TaskDict;
  columnDict: ColumnDict;
  columnOrder: string[];
}

export const BoardContent = ({
  taskDict,
  columnDict,
  columnOrder,
  onDragEnd,
  onAddTask,
}: Props) => {
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isOpen, setOpen] = useState(false);

  const setupTaskModal = (task: Task) => {
    if (!selectedTask) {
      setOpen(true);
      setSelectedTask(task);
    }
  };

  const destroyTaskModal = () => {
    setOpen(false);
    setSelectedTask(undefined);
  };

  return Object.keys(columnDict).length === 0 ? null : (
    <>
      {selectedTask && (
        <TaskModal
          open={isOpen}
          task={selectedTask}
          onClose={destroyTaskModal}
        />
      )}
      <StyledBoard>
        <DragDropContext onDragEnd={onDragEnd}>
          {columnOrder.map((columnKey: string) => {
            const column = columnDict[columnKey];
            return (
              <SprintColumn
                key={column.id}
                columnKey={columnKey}
                column={column}
                taskDict={taskDict}
                onAddTask={onAddTask}
                onTaskClick={setupTaskModal}
              />
            );
          })}
        </DragDropContext>
      </StyledBoard>
    </>
  );
};

const StyledBoard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  max-width: 100%;
  margin-top: var(--p8);

  @media (min-width: 1400px) {
    overflow-x: scroll;
  }
`;
