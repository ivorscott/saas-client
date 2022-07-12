import { Column, ColumnDict, Task, TaskDict } from "types/board";
import { PinnedProject, Project } from "types/project";
import { Organization, TMap } from "types/tenant";
import { User, UserDict } from "types/user";

export function getUserInitials(firstName: string, lastName: string) {
  return firstName.substring(0, 1) + (lastName || "").substring(0, 1);
}

export function formatPath(company: string | undefined): string {
  if (!company) {
    return "";
  }
  const re = /[^a-zA-Z0-9]+/g;
  return company.replaceAll(re, "").toLowerCase();
}

export function getOrgs(data: TMap) {
  return Object.keys(data).map((id) => ({
    path: data[id].path,
    id: data[id].id,
    name: data[id].company,
  })) as Organization[];
}

export function assignColor<T>(obj: T, index: number) {
  return {
    ...obj,
    color: `badge${(index % 9) + 1}`,
  };
}

export function getPinState(project: Project) {
  const pinnedSettings = localStorage.getItem("settings.pinned") || "[]";
  const data = JSON.parse(pinnedSettings);
  if (data.length) {
    return !!data.find((obj: PinnedProject) => {
      return obj.projectId === project.id;
    });
  }
  return false;
}

export function findPinnedByPath(
  pinned: PinnedProject[],
  path: string
): PinnedProject[] {
  if (pinned && pinned.length) {
    return pinned.filter((obj: PinnedProject) => {
      return obj.tenantPath === path;
    });
  }
  return [];
}

type SortBy = "asc" | "desc";
// Sorts values by given key in descending order unless ascending order is specified.
export function orderBy<T>(key: string, values: T[], sortBy: SortBy = "desc") {
  return values.sort(
    (a: { [index: string]: any }, b: { [index: string]: any }) => {
      let fieldA, fieldB;
      try {
        // Assume it's a string.
        fieldA = a[key].toLowerCase();
        fieldB = b[key].toLowerCase();
      } catch {
        fieldA = a[key];
        fieldB = b[key];
      }

      if (sortBy === "desc") {
        return sortByDesc(fieldA, fieldB);
      } else {
        return sortByAsc(fieldA, fieldB);
      }
    }
  );
}

function sortByDesc(a: any, b: any) {
  return a > b ? 1 : a < b ? -1 : 0;
}

function sortByAsc(a: any, b: any) {
  return a < b ? 1 : a > b ? -1 : 0;
}

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
