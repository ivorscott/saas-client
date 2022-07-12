export interface Board {
  columns: ColumnDict;
  tasks: TaskDict;
}

export interface ColumnDict {
  [index: string]: Column;
}

export interface TaskDict {
  [index: string]: Task;
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
