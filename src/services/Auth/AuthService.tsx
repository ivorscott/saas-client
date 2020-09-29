import React, { useState, useEffect } from "react";
import { actions } from "./reducers";
import { AWSConnect, getAuthDetails, transformUser } from "./helpers";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { useDispatch } from "react-redux";
import { history } from "../../history";
import { client } from "../Client";
import { env } from "../../env";
import { Loading } from "../../shared/components/Loading";
import { fetchImage } from "../../features/Account/reducer";
import { UserPayload } from "./types";

const {
  domain,
  audience,
  client_id,
  redirect_uri,
  identity_pool_id,
  s3_bucket,
  s3_bucket_region,
  cognito_region,
} = env;

const { authenticateUser } = actions;

export const auth0Client = new Auth0Client({
  domain: domain as string,
  audience: audience as string,
  client_id: client_id as string,
  redirect_uri: redirect_uri as string,
  useRefreshTokens: true,
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
          history.push(appState ? appState : pathname);
        }

        const ok = await auth0Client.isAuthenticated();

        if (ok) {
          const authResult = await getAuthDetails(auth0Client);
          const { auth0_user, access_token, claims } = authResult;

          const roles = claims["https://client.devpie.io/claims/roles"];
          const user = (await client.get("/users/me")) as UserPayload;

          await AWSConnect({
            auth0_user,
            auth0_id_token: claims.__raw,
            auth0_id_token_exp: claims.exp as number,
            auth0_domain: domain as string,
            auth0_access_token: access_token,
            cognito_region: cognito_region as string,
            cognito_identity_pool_id: identity_pool_id as string,
            s3_bucket: s3_bucket as string,
            s3_bucket_region: s3_bucket_region as string,
          });

          if (!user.error) {
            setIsAuthenticated(ok);
            dispatch(authenticateUser({ ...user, roles }));
            dispatch(fetchImage(auth0_user.sub));
          } else {
            if (claims["https://client.devpie.io/claims/is_new"]) {
              const newUser = transformUser(auth0_user);
              const result = await client.post("/users", newUser);
              if (!result.error) {
                await auth0Client.loginWithRedirect();
              }
            }
          }
        } else {
          await auth0Client.loginWithRedirect({
            appState: pathname,
          });
        }
      } catch (err) {
        if (err.message === "Invalid state") {
          await auth0Client.loginWithRedirect();
        } else {
          console.log(err); // Todo: log to Sentry
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
