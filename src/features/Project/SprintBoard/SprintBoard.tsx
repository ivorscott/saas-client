import React, { useState } from "react";
import {
  useAddTask,
  useUpdateTask,
  useDeleteTask,
  useMoveTask,
  useColumns,
  useTasks,
} from "./api";
import { SprintColumn } from "../SprintColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Project, Board, ColumnDict, Task, TaskDict } from "../types";
import styled from "styled-components";
import { makeColumnsDict, makeTasksDict } from "./helpers";
import { useEffect } from "react";
// import { UpdateTask as UpdateTaskModal } from "../SprintTask/UpdateTask";

interface BoardActions {
  onDragEnd: (result: DropResult) => void;
  onAddTask: (task: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
  onDeleteTask: (columnKey: string, taskId: string) => void;
}

interface Props extends BoardActions {
  taskDict: TaskDict;
  columnDict: ColumnDict;
  columnOrder: string[];
}

const BoardContent = ({
  taskDict,
  columnDict,
  columnOrder,
  onDragEnd,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: Props) => {
  // store modal open state
  // render one modal
  // handle modal toggle

  return Object.keys(columnDict).length === 0 ? null : (
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
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          );
        })}
      </DragDropContext>
      {/* <UpdateTaskModal
        open={open}
        task={task}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
        onTaskToggle={onTaskToggle}
      /> */}
    </StyledBoard>
  );
};

export const SprintBoard = ({ project }: { project: Project }) => {
  const rawColumns = useColumns(project.id);
  const rawTasks = useTasks(project.id);

  if (!rawColumns.data || !rawTasks.data) {
    return null;
  }

  let columns = makeColumnsDict(rawColumns.data);
  let tasks = makeTasksDict(rawTasks.data);

  return <BoardManager project={project} initialBoard={{ columns, tasks }} />;
};

const BoardManager = ({
  project,
  initialBoard,
}: {
  project: Project;
  initialBoard: Board;
}) => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [addTask] = useAddTask();
  const [updateTask] = useUpdateTask();
  const [deleteTask] = useDeleteTask();
  const [moveTask] = useMoveTask();

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const { columns, tasks } = board;

  const handleDeleteTaskSubmit = async (columnKey: string, taskId: string) => {
    const column = columns[columnKey];

    const newTaskIds = column.taskIds.filter((id: string) => id !== taskId);

    const columnUpdate = {
      ...column,
      taskIds: newTaskIds,
    };

    const updatedColumnDict = {
      ...columns,
      [column.columnName]: columnUpdate,
    };

    delete tasks[taskId];

    setBoard({ columns: updatedColumnDict, tasks });
    deleteTask({ projectId: project.id, columnId: column.id, taskId });
  };

  const handleUpdateTaskSubmit = async (columnKey: string, newTask: Task) => {
    const taskDict = {
      ...tasks,
      [newTask.id.toString()]: newTask,
    };

    setBoard({ columns, tasks: taskDict });
    const {
      id: taskId,
      title,
      content,
      assignedTo,
      attachments,
      comments,
    } = newTask;
    await updateTask({
      taskId,
      task: { title, content, assignedTo, attachments, comments },
      projectId: project.id,
    });
  };

  const handleAddTask = async (task: string) => {
    const columnKey: string = "column-1";
    const column = columns[columnKey];

    await addTask({
      projectId: project.id,
      columnId: column.id,
      task,
    });
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (start === finish) {
      columnDidNotChange(result);
    } else {
      columnDidChange(result);
    }
  };

  const columnDidNotChange = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const start = columns[source.droppableId];
    const newTaskIds = [...start.taskIds];

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const columnUpdate = {
      ...start,
      taskIds: newTaskIds,
    };

    const updatedColumnsDict = {
      ...columns,
      [columnUpdate.columnName]: columnUpdate,
    };

    setBoard({ columns: updatedColumnsDict, tasks });
    return updatedColumnsDict;
  };

  const columnDidChange = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const updatedColumnsDict = {
      ...columns,
      [newStart.columnName]: newStart,
      [newFinish.columnName]: newFinish,
    };

    setBoard({ columns: { ...updatedColumnsDict }, tasks });

    await moveTask({
      to: finish.id,
      from: start.id,
      taskId: draggableId,
      taskIds: finishTaskIds as string[],
      projectId: project.id,
    });
    return updatedColumnsDict;
  };

  return Object.keys(columns).length > 0 ? (
    <BoardContent
      columnOrder={project.columnOrder}
      taskDict={tasks}
      columnDict={columns}
      onDragEnd={onDragEnd}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTaskSubmit}
      onUpdateTask={handleUpdateTaskSubmit}
    />
  ) : null;
};

const StyledBoard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  height: 80vh;
  max-width: 100%;
  margin-top: var(--p8);

  @media (min-width: 1400px) {
    overflow-x: scroll;
  }
`;
