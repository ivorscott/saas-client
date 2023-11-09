import { useMutation, useQuery } from "react-query";

import { client as api } from "../services/APIService";
import { StripePayload, SubscriptionInfo } from "../types/subscription";

export function useCreateSubscription() {
  return useMutation<void, Error, StripePayload>((payload) =>
    api.post("/subscriptions", payload)
  );
}

export function useSubscriptionInfo(tenantId?: string) {
  const { isLoading, isError, data } = useQuery<SubscriptionInfo, Error>(
    "billing",
    async () => {
      if (!tenantId) {
        return;
      }
      return api.get(`/subscriptions/${tenantId}`);
    }
  );

  if (isLoading || isError || !data) {
    return;
  }

  return data;
}
