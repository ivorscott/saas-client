import { useMutation, useQuery, useQueryClient } from "react-query";
import { Invite } from "types/invite";
import { client as api } from "services/APIService";

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
