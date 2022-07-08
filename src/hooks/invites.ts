import { useMutation, useQuery, useQueryClient } from "react-query";
import { Invite } from "../components/TopBar/types";
import { client as api } from "../services/APIService";

export function useCreateInvite() {
  const { mutate } = useMutation<
    Invite,
    Error,
    { teamId: string; emailList: string[] }
  >(({ teamId, emailList }) =>
    api.post(`/users/teams/${teamId}/invites`, {
      emailList,
    })
  );
  return [mutate];
}

export function useInvites() {
  return useQuery<Invite[], Error>(
    "invites",
    async () => await api.get("/users/teams/invites")
  );
}

export function useInviteDecision() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Invite,
    Error,
    { invite: Invite; accepted: boolean }
  >(
    ({ invite, accepted }) =>
      api.patch(`/users/teams/${invite.teamId}/invites/${invite.id}`, {
        accepted,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("invites");
        await queryClient.invalidateQueries("projects");
      },
    }
  );
  return [mutate];
}
