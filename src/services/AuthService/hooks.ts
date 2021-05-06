import React, { useState, useEffect } from "react";
import { actions } from "./reducers";
import { useDispatch } from "react-redux";
import { history } from "../../shared/history";
import { fetchImage } from "../../features/Account/reducer";
import { client as authClient } from "./AuthService";
import { client as devpieClient } from "../APIService";
// import { useMutation, useQuery } from "react-query";
import { Auth0User, User } from "./types";

export type UserPayload = User & {
  error?: string;
};

const { authenticateUser } = actions;

// export function useUser<AppUser>(authUser: AuthDetails) {
//   const roles = authUser.claims["https://client.devpie.io/claims/roles"];
//   const [user, setUser] = useState<AppUser>();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetch = () => {
//       const { data, isError, isSuccess } = useQuery<AppUser>(
//         "auth",
//         async () => await devpieClient.get("/users/me")
//       );

//       console.log(data);

//       if (isError) {
//         const mutation = useMutation<AppUser, AxiosError, Partial<User>>(
//           (authUser) => devpieClient.post("/users", authUser)
//         );
//         const newUser = transformAuth0User(authUser.identity);
//         mutation.mutate(newUser);
//         dispatch(authenticateUser({ ...newUser, roles }));
//         window.location.reload();
//       }
//       setUser(data);

//       if (data && isSuccess) {
//         dispatch(authenticateUser({ ...user, roles }));
//         dispatch(fetchImage({ defaultImage: data.picture, id: data.id }));
//       }
//     };
//     fetch();
//   }, [authUser]);

//   return user;
// }

export function useAuth() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { search, pathname } = window.location;

        // handle freshbooks redirect
        if (search.includes("code=") && !search.includes("state=")) {
          // await freshClient.handleRedirect()
        }

        // handle auth0 redirect
        if (search.includes("code=") && search.includes("state=")) {
          const { appState } = await authClient.handleRedirectCallback();
          history.push(appState ? appState : pathname);
        }

        const ok = await authClient.isAuthenticated();

        if (ok) {
          const authResult = await authClient.getAuthDetails();
          const { identity, claims } = authResult;
          const roles = claims["https://client.devpie.io/claims/roles"];

          const user = (await devpieClient.get("/users/me")) as UserPayload;

          if (!user.error) {
            setIsAuthenticated(ok);
            dispatch(authenticateUser({ ...user, roles }));
            dispatch(fetchImage({ defaultImage: user.picture, id: user.id }));
          } else {
            const newUser = transformAuth0User(identity);
            dispatch(authenticateUser({ ...newUser, roles }));
            await devpieClient.post("/users", newUser);
            window.location.reload();
          }
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
      setLoading(false);
    };

    authenticate();
  }, []);

  return { isAuthenticated, isLoading, isError };
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
