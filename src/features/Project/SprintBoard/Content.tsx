import React, { useState } from "react";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { SprintColumn } from "./SprintColumn";
import { Task, TaskDict, ColumnDict, Project } from "../types";
import { TaskModal } from "./SprintTask/TaskModal";
import { useTeamMemberships } from "../../../hooks/teams";
import { makeUserDict } from "./helpers";

interface BoardActions {
  onDragEnd: (result: DropResult) => void;
  onAddTask: (task: string) => void;
}

interface Props extends BoardActions {
  taskDict: TaskDict;
  columnDict: ColumnDict;
  project: Project;
}

export const BoardContent = ({
  taskDict,
  project,
  columnDict,
  onDragEnd,
  onAddTask,
}: Props) => {
  const [selectedTask, setSelectedTask] = useState<{
    columnId: string;
    task: Task;
  }>();
  const [isOpen, setOpen] = useState(false);
  const { data } = useTeamMemberships(project?.teamId);
  const users = makeUserDict(data);

  const setupTaskModal = (columnId: string, task: Task) => {
    if (!selectedTask) {
      setOpen(true);
      setSelectedTask({ columnId, task });
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
          data={selectedTask}
          onClose={destroyTaskModal}
        />
      )}
      <StyledBoard>
        <DragDropContext onDragEnd={onDragEnd}>
          {project.columnOrder.map((columnKey: string) => {
            const column = columnDict[columnKey];
            return (
              <SprintColumn
                key={column.id}
                users={users}
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

  @media (min-width: 1400px) {
    overflow-x: scroll;
  }
`;
