import { useQuery, useQueryClient, useMutation } from "react-query";
import { client as api } from "../../services/APIService";
import { Invite } from "../App/TopBar/types";
import { Memberships, Project, Team } from "./types";
import { history } from "../../shared/history";

export function useProject(projectId: string) {
  return useQuery<Project>(
    ["project", projectId],
    async () => await api.get(`/projects/${projectId}`)
  );
}

export function useProjects() {
  return useQuery<Project[]>(
    "projects",
    async () => await api.get("/projects")
  );
}

export interface UpdateProject {
  id: string;
  active?: string;
  public?: string;
  description?: string;
  name?: string;
  columnOrder?: string[];
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Project, Error, string>(
    (name) => api.post("/projects", { name }),
    {
      onSuccess: (data, variable) => {
        queryClient.setQueryData(["projects", { name: variable }], data);
        history.push(`/manage/projects/${data.id}`);
      },
    }
  );
  return [mutate];
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Project, Error, UpdateProject>(
    ({ id, ...rest }) =>
      api.patch(`/projects/${id}`, {
        ...rest,
      }),
    {
      onSuccess: (data) => {
        console.log("======>", data);
        queryClient.setQueryData(["project", data.id], data);
      },
    }
  );
  return [mutate];
}

export function useTeamMemberships(teamId?: string) {
  return useQuery<Memberships[]>(["memberships", teamId], async () => {
    if (teamId) {
      return await api.get(`/users/teams/${teamId}/members`);
    }
    return;
  });
}

export function useAllTeamMemberships(teamIds?: (string | undefined)[]) {
  if (!teamIds || teamIds.length === 0) {
    return [];
  }
  return useQuery<Memberships[], Error>("memberships", () => {
    const promises = teamIds.map((teamId) => {
      if (teamId) {
        return api.get(`/users/teams/${teamId}/members`);
      }
      return;
    });

    return Promise.all(promises);
  });
}

export function useTeam(teamId?: string) {
  return useQuery<Team>(["team", teamId], async () => {
    if (teamId) {
      return await api.get(`/users/teams/${teamId}`);
    }
    return;
  });
}

export function useTeams() {
  return useQuery<Team[]>(["teams"], async () => {
    return await api.get(`/users/teams`);
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Team,
    Error,
    { teamName: string; projectId: string }
  >(
    ({ teamName, projectId }) =>
      api.post(`/users/teams`, {
        name: teamName,
        projectId,
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["team", data.id], data);
      },
    }
  );
  return [mutate];
}

export function useCreateInvite() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Invite,
    Error,
    { team: Team; emailList: string[] }
  >(
    ({ team, emailList }) =>
      api.post(`/users/teams/${team?.id}/invites`, {
        emailList,
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["invites"], (old) => [
          ...(old as Invite[]),
          data,
        ]);
      },
    }
  );
  return [mutate];
}
