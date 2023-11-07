import { useMutation, useQuery, useQueryClient } from "react-query";
import { client as api } from "services/APIService";
import { Invite } from "types/invite";

export function useInvites() {
  return useQuery<Invite[], Error>(
    "invites",
    async () => []
    // async () => await api.get("/users/invites")
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
      api.patch(`/users/invites/${invite.id}`, {
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
