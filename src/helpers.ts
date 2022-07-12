import { Project } from "./features/Project/types";
import { TMap } from "./hooks/users";

export function getUserInitials(firstName: string, lastName: string) {
  return firstName.substring(0, 1) + (lastName || "").substring(0, 1);
}

export function getTeamInitials(teamName: string) {
  if (teamName.includes(" ")) {
    const names = teamName.split(" ");
    return names[0].substring(0, 1) + names[1].substring(0, 1);
  } else {
    return teamName.substring(0, 2);
  }
}

export const formatPath = (company: string | undefined): string => {
  if (!company) {
    return "";
  }
  const re = /[^a-zA-Z0-9]+/g;

  return company.replaceAll(re, "").toLowerCase();
};

interface Organization {
  id: string;
  path: string;
  name: string;
  color?: string;
}

export const getOrgs = (data: TMap) => {
  return Object.keys(data).map((id) => ({
    path: data[id].path,
    id: data[id].id,
    name: data[id].company,
  })) as Organization[];
};

export function assignColor<T>(org: T, index: number) {
  return {
    ...org,
    color: `badge${(index % 9) + 1}`,
  };
}

export interface PinnedProject {
  tenantPath: string;
  projectId: string;
  name: string;
}

export const getPinState = (project: Project) => {
  const pinnedSettings = localStorage.getItem("settings.pinned");
  if (pinnedSettings) {
    const data = JSON.parse(pinnedSettings);
    if (data && data.length) {
      return !!data.find((obj: PinnedProject) => {
        return obj.projectId === project.id;
      });
    }
  }

  return false;
};

export const findPinnedByPath = (
  settings: PinnedProject[],
  path: string
): PinnedProject[] => {
  if (settings) {
    if (settings && settings.length) {
      return settings.filter((obj: PinnedProject) => {
        return obj.tenantPath === path;
      });
    }
  }

  return [];
};

type SortBy = "asc" | "desc";

// Sorts values by given key in descending order unless ascending order is specified.
function orderBy<T>(key: string, values: T[], sortBy: SortBy = "desc") {
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

const sortByDesc = (a: any, b: any) => {
  return a > b ? 1 : a < b ? -1 : 0;
};

const sortByAsc = (a: any, b: any) => {
  return a < b ? 1 : a > b ? -1 : 0;
};

export { orderBy };
