import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { actions } from "./reducers";
import { history } from "../../history";
import { transform } from "./helpers";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { useDispatch } from "react-redux";
import { IdentityPayload } from "./types";
import client from "../Client";
import env from "../../env";

const { authenticateUser } = actions;

export const auth0Client = new Auth0Client({
  domain: env.domain || "",
  audience: env.audience || "",
  client_id: env.client_id || "",
  redirect_uri: env.redirect_uri || "",
});

const Auth0Provider: React.FC<{ children: any }> = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { search, pathname } = window.location;
        if (search.includes("code=") && search.includes("state=")) {
          const { appState } = await auth0Client.handleRedirectCallback();
          history.push(
            appState && appState.targetUrl ? appState.targetUrl : pathname
          );
        }

        const ok = await auth0Client.isAuthenticated();

        if (ok) {
          const auth0User = (await auth0Client.getUser()) as IdentityPayload;
          const claims = await auth0Client.getIdTokenClaims();
          const roles = claims["https://client.devpie.io/claims/roles"];
          const user = await client.get("/users/me");

          if (!user.error) {
            setIsAuthenticated(ok);
            dispatch(authenticateUser({ ...user, roles }));
          } else {
            if (claims["https://client.devpie.io/claims/is_new"]) {
              const newUser = transform(auth0User);
              const result = await client.post("/users", newUser);
              if (!result.error) {
                await auth0Client.loginWithRedirect();
              }
            }
          }
        } else {
          await auth0Client.loginWithRedirect();
        }
      } catch (err) {
        if (err.message === "Invalid state") {
          await auth0Client.loginWithRedirect();
        } else {
          setIsError(true);
          throw new Error("unknown authentication error");
        }
      }
      setLoading(false);
    };
    authenticate();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50vh" }}>
        <CircularProgress />
      </div>
    );
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
