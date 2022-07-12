import { UseQueryResult } from "react-query";

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  company?: string;
  updatedAt: string;
  createdAt: string;
}

export interface UserDict {
  [index: string]: User;
}

export type CurrentUser = User & {
  tenantId: string;
  company: string;
  accountOwner: boolean;
  connections: ConnectionMap;
  username: string;
};

interface ConnectionMap {
  [index: string]: Connection;
}

type Connection = {
  id: string;
  path: string;
  plan: string;
  companyName: string;
};

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

export interface DeleteUserInput {
  userId: string;
}

export interface SeatsAvailable {
  maxSeats: number;
  seatsAvailable: number;
}

export interface TableUser {
  id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  email: string;
  createdAt: string;
}

export type UserQuery = UseQueryResult<User[], Error>;

export interface ColumnDict {
  [index: string]: Column;
}

export interface TaskDict {
  [index: string]: Task;
}

export interface Project {
  id: string;
  name: string;
  prefix: string;
  description: string;
  tenantId: string;
  userId: string;
  active: boolean;
  public: boolean;
  columnOrder: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  columns: ColumnDict;
  tasks: TaskDict;
}

export interface Column {
  id: string;
  projectId: string;
  title: string;
  columnName: string;
  taskIds: string[];
  created: string;
}

export interface Task {
  id: string;
  key: string;
  seq: number;
  title: string;
  points: number;
  assignedTo: string;
  comments: string[];
  attachments: string[];
  content: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTask {
  projectId: string;
  columnId: string;
  task: string;
}

export interface DeleteTask {
  projectId: string;
  columnId: string;
  taskId: string;
}

export interface MoveTask {
  projectId: string;
  to: string;
  from: string;
  taskId: string;
  taskIds: string[];
}

export interface TMap {
  [index: string]: {
    path: string;
    company: string;
    id: string;
  };
}
