import React, { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Project, Board, Task } from "../types";
import { makeColumnsDict, makeTasksDict } from "./helpers";
import { BoardContent } from "./Content";
import {
  useAddTask,
  // useDeleteTask,
  useMoveTask,
  useColumns,
  useTasks,
} from "../../../hooks/board";

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
  // const [deleteTask] = useDeleteTask();
  const [moveTask] = useMoveTask();

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const { columns, tasks } = board;

  // const handleDeleteTaskSubmit = async (columnKey: string, taskId: string) => {
  //   const column = columns[columnKey];

  //   const newTaskIds = column.taskIds.filter((id: string) => id !== taskId);

  //   const columnUpdate = {
  //     ...column,
  //     taskIds: newTaskIds,
  //   };

  //   const updatedColumnDict = {
  //     ...columns,
  //     [column.columnName]: columnUpdate,
  //   };

  //   delete tasks[taskId];

  //   setBoard({ columns: updatedColumnDict, tasks });
  //   deleteTask({ projectId: project.id, columnId: column.id, taskId });
  // };

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
    console.log(result);
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
    console.log(result);

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
      taskIds: finishTaskIds,
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
      // onDeleteTask={handleDeleteTaskSubmit}
    />
  ) : null;
};
