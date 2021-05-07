import { useState, useEffect } from "react";
import { actions } from "./reducers";
import { useDispatch } from "react-redux";
import { history } from "../../shared/history";
import { fetchImage } from "../../features/Account/reducer";
import { client as authClient } from "./AuthService";
import { client as devpieClient } from "../APIService";
import { Auth0User, User, UserPayload } from "./types";
import { IdToken } from "@auth0/auth0-spa-js";
import { useQuery } from "react-query";

export function useAuth() {
  const [isError, setIsError] = useState(false);
  const [stillAuthenticating, setAuthenticating] = useState(true);
  const [auth0User, setAuth0User] = useState<{
    identity: Auth0User;
    access_token: string;
    claims: IdToken;
  }>();

  const dispatch = useDispatch();

  const create = async (newUser: Partial<User>) => {
    await devpieClient.post("/users", newUser);
    window.location.reload();
  };

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { search, pathname } = window.location;

        if (search.includes("code=") && !search.includes("state=")) {
          // await freshClient.handleRedirect()
        }

        if (search.includes("code=") && search.includes("state=")) {
          const { appState } = await authClient.handleRedirectCallback();
          history.push(appState ? appState : pathname);
        }

        const ok = await authClient.isAuthenticated();

        if (ok) {
          const authResult = await authClient.getAuthDetails();
          setAuth0User(authResult);
        } else {
          await authClient.loginWithRedirect(pathname);
        }
      } catch (err) {
        if (err.message === "Invalid state") {
          await authClient.loginWithRedirect();
        } else {
          setIsError(true);
        }
      }

      setAuthenticating(false);
    };

    authenticate();
  }, []);

  // user react query
  const { data, isSuccess } = useQuery<UserPayload, UserPayload["error"]>(
    "auth",
    async () => await devpieClient.get("/users/me")
  );

  if (stillAuthenticating) {
    return false;
  }

  if (isError) {
    return false;
  }

  // if auth0User exists but the internal user doesn't create user
  if (auth0User && data?.error) {
    const { identity } = auth0User;
    const newUser = transformAuth0User(identity);
    create(newUser);
    return false;
  }

  if (data && isSuccess) {
    const roles = auth0User?.claims["https://client.devpie.io/claims/roles"];
    dispatch(actions.authenticateUser({ ...data, roles }));
    dispatch(fetchImage({ defaultImage: data.picture, id: data.id }));
    return true;
  }

  return false;
}

function transformAuth0User(user: Auth0User): Partial<User> {
  return {
    auth0Id: user.sub,
    email: user.email,
    emailVerified: user.email_verified,
    firstName: user.nickname,
    lastName: "",
    picture: user.picture || "",
    locale: "",
  };
}
