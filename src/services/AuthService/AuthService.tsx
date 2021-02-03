import React, { useState, useEffect } from "react";
import { actions } from "./reducers";
import { AWSConnect, getAuthDetails, transformUser } from "./helpers";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { useDispatch } from "react-redux";
import { history } from "../../history";
import { env } from "../../env";
import { Loading } from "../../shared/components/Loading";
import { fetchImage } from "../../features/Account/reducer";
import { UserPayload } from "./types";
import { client as devpieClient } from "../APIService";
import { client as freshClient } from "../FreshService"

const { authenticateUser } = actions;

export const auth0Client = new Auth0Client({
  domain: env.AUTH0_DOMAIN,
  audience: env.AUTH0_AUDIENCE,
  client_id: env.AUTH0_CLIENT_ID,
  redirect_uri: env.REDIRECT_URI,
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

        // handle freshbooks redirect
        if (search.includes("code=") && !search.includes("state=")) {
          await freshClient.handleRedirect()
        }

        // handle auth0 redirect
        if (search.includes("code=") && search.includes("state=")) {
          const { appState } = await auth0Client.handleRedirectCallback();
          history.push(appState ? appState : pathname);
        }

        const ok = await auth0Client.isAuthenticated();

        if (ok) {
          setIsAuthenticated(ok);

          const authResult = await getAuthDetails(auth0Client);
          const { auth0_user, access_token, claims } = authResult;
          const roles = claims["https://client.devpie.io/claims/roles"];
          const user = (await devpieClient.get("/users/me")) as UserPayload;

          await AWSConnect({
            auth0_user,
            auth0_id_token: claims.__raw,
            auth0_id_token_exp: claims.exp as number,
            auth0_domain: env.AUTH0_DOMAIN,
            auth0_access_token: access_token,
            aws_cognito_identity_pool_id: env.AWS_COGNITO_IDENTITY, 
            aws_s3_bucket: env.AWS_S3_BUCKET,
            aws_region: env.AWS_REGION,
          });

          if (!user.error) {
            dispatch(authenticateUser({ ...user, roles }));
            dispatch(fetchImage(auth0_user.sub));
          } else {
            const newUser = transformUser(auth0_user);
            dispatch(authenticateUser({ ...newUser, roles }));
            await devpieClient.post("/users", newUser);
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
