import React, { useState, useEffect } from "react";
import { actions } from "./reducers";
import { useDispatch } from "react-redux";
import { history } from "../../history";
import { Loading } from "../../shared/components/Loading";
import { fetchImage } from "../../features/Account/reducer";
import { IdentityPayload, User, UserPayload } from "./types";
import { client as authClient } from "./AuthService"
import { client as devpieClient } from "../APIService";
// import { client as freshClient } from "../FreshService"

function _transformUser(user: IdentityPayload): Partial<User> {
  return {
    auth0Id: user.sub,
    email: user.email,
    emailVerified: user.email_verified,
    firstName: user.given_name || user.nickname,
    lastName: user.family_name || "",
    picture: user.picture || "",
    locale: user.locale || "",
  };
}

const { authenticateUser } = actions;

const Auth0Provider: React.FC<{ children: any }> = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { search, pathname } = window.location;

        if(search.includes("code=") && !search.includes("state=")) {
         // await freshClient.handleRedirect()
        }

        // handle auth0 redirect
        if (search.includes("code=") && search.includes("state=")) {
          const { appState } = await authClient.handleRedirectCallback();
          history.push(appState ? appState : pathname);
        }

        const ok = await authClient.isAuthenticated();

        if (ok) {
          setIsAuthenticated(ok);

          const authResult = await authClient.getAuthDetails();
          const { auth0_user, claims } = authResult;
          const roles = claims["https://client.devpie.io/claims/roles"];

          const user = (await devpieClient.get("/users/me")) as UserPayload;

          await authClient.AWSConnect();

          if (!user.error) {
            dispatch(authenticateUser({ ...user, roles }));
            dispatch(fetchImage(auth0_user.sub));
          } else {
            const newUser = _transformUser(auth0_user);
            dispatch(authenticateUser({ ...newUser, roles }));
            await devpieClient.post("/users", newUser);
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
    
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Something went Wrong!</h1>;
  }
  if (isAuthenticated) {
    return children;
  }
  return <div />;
};

export { Auth0Provider };
