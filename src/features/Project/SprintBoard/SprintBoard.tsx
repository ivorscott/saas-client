import React, { useEffect, useState } from "react";
import { addTask, updateTask, deleteTask, moveTask, fetchBoard } from "./api";
import { Loading } from "../../../shared/components/Loading";
import { SprintColumn } from "../SprintColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Project, Board, ColumnDict, Task, TaskDict } from "../types";
import styled from "styled-components";

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

const StyledBoard = styled.div`
  display: flex;
  height: 70vh;
  margin-top: var(--p8);
`;

const Component = ({
  taskDict,
  columnDict,
  columnOrder,
  onDragEnd,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: Props) => {
  return Object.keys(columnDict).length === 0 ? (
    <Loading />
  ) : (
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
    </StyledBoard>
  );
};

const SprintBoard: React.FC<{ project: Project }> = ({ project }) => {
  const [board, setBoard] = useState<Board>({ columns: {}, tasks: {} });
  const { columns, tasks } = board;
  useEffect(() => {
    const fetch = async ({ id }: Project) => {
      const { columns, tasks } = await fetchBoard(id);
      setBoard({ columns, tasks });
    };
    fetch(project);
  }, [project]);
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
    deleteTask({ columnId: column.id, taskId });
  };

  const handleUpdateTaskSubmit = async (columnKey: string, newTask: Task) => {
    const taskDict = {
      ...tasks,
      [newTask.id.toString()]: newTask,
    };

    setBoard({ columns, tasks: taskDict });
    const { id: taskId, title, content } = newTask;
    await updateTask({
      taskId,
      task: { title, content },
    });
  };

  const handleAddTask = async (task: string) => {
    const columnKey: string = "column-1";
    const column = columns[columnKey];
    const newTask = await addTask({
      projectId: project.id,
      columnId: column.id,
      task,
    });

    const newTaskIds = [...column.taskIds];
    newTaskIds.unshift(newTask.id);

    const columnUpdate = {
      ...column,
      taskIds: newTaskIds,
    };

    const updatedColumnDict = {
      ...columns,
      [columnUpdate.columnName]: columnUpdate,
    };

    const updatedTaskDict = {
      ...tasks,
      [newTask.id.toString()]: newTask,
    };

    setBoard({ columns: updatedColumnDict, tasks: updatedTaskDict });
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
      taskIds: finishTaskIds,
    });
    return updatedColumnsDict;
  };

  return Object.keys(columns).length > 0 ? (
    <Component
      columnOrder={project.columnOrder}
      taskDict={tasks}
      columnDict={columns}
      onDragEnd={onDragEnd}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTaskSubmit}
      onUpdateTask={handleUpdateTaskSubmit}
    />
  ) : (
    <Loading />
  );
};

export { SprintBoard };
