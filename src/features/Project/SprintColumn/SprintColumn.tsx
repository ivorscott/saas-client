import React from "react";
import { SprintTask } from "../SprintTask";
import { AddTask } from "../SprintTask";
import { Paper, Typography } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import { styles } from "./styles";
import "./css.css";
import { Column, Task, TaskDict } from "../types";
import { withStyles, WithStyles } from "@material-ui/core/styles";

interface Actions {
  onAddTask: (task: string) => void;
  onUpdateTask: (columnKey: string, task: Task) => void;
  onDeleteTask: (columnKey: string, taskId: string) => void;
}

interface Props extends WithStyles<typeof styles>, Actions {
  columnKey: string;
  column: Column;
  taskDict: TaskDict;
}

const SprintColumn = withStyles(styles)(
  ({
    columnKey,
    classes,
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

    return (
      <Paper className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {column.title}
        </Typography>

        {columnKey === "column-1" && <AddTask onAddTask={onAddTask} />}

        <section className={classes.content}>
          <div className={classes.column}>
            <Droppable droppableId={columnKey}>
              {(
                { innerRef, droppableProps, placeholder },
                { isDraggingOver }
              ) => (
                <div
                  className={classes.droppable}
                  ref={innerRef}
                  {...droppableProps}
                  {...isDraggingOver}
                >
                  {Object.keys(taskDict).length > 0 &&
                    renderTasks(taskDict, columnKey)}
                  {placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </section>
      </Paper>
    );
  }
);

export { SprintColumn };
