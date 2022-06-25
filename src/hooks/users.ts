import { useMutation, useQuery } from "react-query";
import { client as api } from "../services/APIService";
import { NewUser, User } from "./types";
import { Auth } from "aws-amplify";

export function useCreateUser() {
  const { mutate } = useMutation<NewUser, Error, NewUser>(async (user) => {
    const session = await Auth.currentSession();
    const { payload } = session.getIdToken();

    user.company = payload["custom:company-name"];

    return api.post(`/users`, user);
  });
  return [mutate];
}

export function useUsers() {
  return useQuery<User[], Error>("users", async () => await api.get("/users"));
}
