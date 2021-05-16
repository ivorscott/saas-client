import { useQuery, useQueryClient, useMutation } from "react-query";
import { Memberships, Team } from "../features/Project/types";
import { client as api } from "../services/APIService";

export function useTeamMemberships(teamId?: string) {
  return useQuery<Memberships[], Error>(["memberships", teamId], async () => {
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
