import React, { useEffect, useState } from "react";
import { Grid, withStyles, WithStyles } from "@material-ui/core";
import { addTask, updateTask, deleteTask, fetchBoard } from "./api";
import { Loading } from "../../../shared/components/Loading";
import { SprintColumn } from "../SprintColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styles } from "./styles";
import { Board, ColumnDict, Task, TaskDict } from "../types";
import { Project } from "../reducer";
// import { removeFromDict } from "./helpers";

interface BoardActions {
  onDragEnd: (result: DropResult) => void;
  onAddTask: (task: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
  onDeleteTask: (columnKey: string, taskId: string) => void;
}

interface Props extends BoardActions, WithStyles<typeof styles> {
  taskDict: TaskDict;
  columnDict: ColumnDict;
  columnOrder: string[];
}

const Component = withStyles(styles)(
  ({
    classes,
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
      <Grid className={classes.board} item={true} xs={12}>
        <div className={classes.root}>
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
        </div>
      </Grid>
    );
  }
);

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
    deleteTask({ projectId: column.projectId, columnId: column.id, taskId });
  };

  const handleUpdateTaskSubmit = async (columnKey: string, newTask: Task) => {
    const column = columns[columnKey];

    const taskDict = {
      ...tasks,
      [newTask.id.toString()]: newTask,
    };

    setBoard({ columns, tasks: taskDict });
    const { id: taskId, title, content } = newTask;
    await updateTask({
      projectId: column.projectId,
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

  return Object.keys(columns).length > 0 ? (
    <Component
      columnOrder={project.columnOrder}
      taskDict={tasks}
      columnDict={columns}
      onDragEnd={() => {}}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTaskSubmit}
      onUpdateTask={handleUpdateTaskSubmit}
    />
  ) : (
    <Loading />
  );
};

export { SprintBoard };
