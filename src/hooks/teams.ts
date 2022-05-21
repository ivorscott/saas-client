import { useQuery, useQueryClient, useMutation } from "react-query";
import { Memberships, Team } from "../features/Project/types";
import { client as api } from "../services/APIService";
import { history } from "../features/App/history";

export function useTeamMemberships(teamId?: string) {
  return useQuery<Memberships[], Error>(["memberships", teamId], async () => {
    if (teamId) {
      return await api.get(`/users/teams/${teamId}/members`);
    }
    return;
  });
}

export function useTeam(teamId?: string) {
  return useQuery<Team, Error>(["team", teamId], async () => {
    if (teamId) {
      return await api.get(`/users/teams/${teamId}`);
    }
    return;
  });
}

export function useTeams() {
  return useQuery<Team[], Error>(["teams"], async () => {
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

export function useExistingTeam() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    void,
    Error,
    { teamId: string; projectId: string }
  >(
    ({ teamId, projectId }) =>
      api.post(`/users/teams/${teamId}/project/${projectId}`, {}),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries("projects");
        queryClient.invalidateQueries(["project", variables.projectId]);
      },
    }
  );
  return [mutate];
}

export function useLeaveTeam() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<void, Error, string>(
    (teamId) => api.post(`/users/teams/${teamId}/leave`, {}),
    {
      onSuccess: (_, teamId) => {
        queryClient.invalidateQueries(["memberships", teamId]);
        queryClient.invalidateQueries(["team", teamId]);

        setTimeout(() => {
          history.push("/manage/projects");
        }, 2000);
      },
    }
  );
  return [mutate];
}
