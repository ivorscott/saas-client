export interface Params {
  id: string;
}

export interface Project {
  id: string;
  name: string;
  teamId: string;
  userId: string;
  active: string;
  public: string;
  columnOrder: string[];
  created: string;
}

export interface Team {
  id: string;
  name: string;
  userId: string;
  created: string;
}

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
  title: string;
  content: string;
  projectId: string;
  created: string;
}

export interface AddTask {
  projectId: string;
  columnId: string;
  task: string;
}

export interface UpdateTask {
  taskId: string;
  task: {
    title: string;
    content: string;
  };
}

export interface DeleteTask {
  columnId: string;
  taskId: string;
}

export interface MoveTask {
  to: string;
  from: string;
  taskId: string;
  taskIds: string[];
}
