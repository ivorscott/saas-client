import {
  Column,
  ColumnDict,
  Memberships,
  Task,
  TaskDict,
  UserDict,
} from "../types";

export function makeUserDict(
  members: Memberships[] | undefined
): UserDict | undefined {
  if (!members) {
    return;
  }
  return (members || []).reduce((acc, curr) => {
    return {
      ...acc,
      [`${curr.userId}`]: {
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
