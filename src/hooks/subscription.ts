import { Auth } from "aws-amplify";
import { useMutation, useQuery } from "react-query";

import { client as api } from "../services/APIService";
import { StripePayload, SubscriptionInfo } from "../types/subscription";

export function useCreateSubscription() {
  return useMutation<void, Error, StripePayload>((payload) =>
    api.post("/subscriptions", payload)
  );
}

export function useSubscriptionInfo() {
  const { isLoading, isError, data } = useQuery<SubscriptionInfo, Error>(
    "subscriptions",
    async (): Promise<SubscriptionInfo> => {
      const session = await Auth.currentSession();
      const { payload } = session.getIdToken();
      return api.get(`/subscriptions/${payload["custom:tenant-id"]}`);
    }
  );

  if (isLoading || isError || !data) {
    return;
  }

  return data;
}
