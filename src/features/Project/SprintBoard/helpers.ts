import {
  Column,
  ColumnDict,
  User,
  Task,
  TaskDict,
  UserDict,
} from "../../../types";

export function makeUserDict(users: User[] | undefined): UserDict | undefined {
  if (!users) {
    return;
  }
  return (users || []).reduce((acc, curr) => {
    return {
      ...acc,
      [`${curr.id}`]: {
        ...curr,
      },
    };
  }, {});
}

export function makeColumnsDict(columns: Column[]): ColumnDict {
  return Object.keys(columns).reduce((acc: any, key: any) => {
    return {
      ...acc,
      ...{
        [columns[key].columnName.toString()]: { ...columns[key] },
      },
    };
  }, {});
}

export function makeTasksDict(tasks: Task[]): TaskDict {
  return Object.keys(tasks).reduce((acc: any, key: any) => {
    return {
      ...acc,
      ...{
        [tasks[key].id.toString()]: { ...tasks[key] },
      },
    };
  }, {});
}
