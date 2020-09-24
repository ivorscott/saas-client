import { client } from "../../../services/Client";
import {
  Board,
  Task,
  AddTask,
  UpdateTask,
  DeleteTask,
  MoveTask,
} from "../types";
import { makeColumnsDict, makeTasksDict } from "./helpers";

export const fetchBoard = async (projectId: string) => {
  const { columns, tasks } = await Promise.all([
    await client.get(`/projects/${projectId}/columns`),
    await client.get(`/projects/${projectId}/tasks`),
  ]).then(([rawColumns, rawTasks]) => {
    return {
      columns: makeColumnsDict(rawColumns),
      tasks: makeTasksDict(rawTasks),
    };
  });
  return { columns, tasks } as Board;
};

export const addTask = async ({ projectId, columnId, task }: AddTask) => {
  return (await client.post(
    `/projects/${projectId}/columns/${columnId}/tasks`,
    {
      title: task,
    }
  )) as Task;
};

export const updateTask = async ({ projectId, taskId, task }: UpdateTask) => {
  return (await client.patch(`/projects/${projectId}/tasks/${taskId}`, {
    title: task.title,
    content: task.content,
  })) as Task;
};

export const deleteTask = async ({
  projectId,
  columnId,
  taskId,
}: DeleteTask): Promise<void> => {
  return await client.delete(
    `/projects/${projectId}/columns/${columnId}/tasks/${taskId}`
  );
};

export const moveTask = async ({
  projectId,
  to,
  from,
  taskId,
  taskIds,
}: MoveTask): Promise<void> => {
  await client.patch(`/projects/${projectId}/tasks/${taskId}/move`, {
    to,
    from,
    taskIds,
  });
};
