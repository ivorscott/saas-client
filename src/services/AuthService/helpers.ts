import AWS from "aws-sdk";
import Amplify, { Auth } from "aws-amplify";
import { AWSConnectOptions, IdentityPayload, User } from "./types";
import { Auth0Client } from "@auth0/auth0-spa-js";

export function transformUser(user: IdentityPayload): Partial<User> {
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

export async function getAuthDetails(auth0Client: Auth0Client) {
  return Promise.all([
    auth0Client.getUser() as Promise<IdentityPayload>,
    auth0Client.getTokenSilently() as Promise<string>,
    auth0Client.getIdTokenClaims(),
  ])
    .then(([auth0_user, access_token, claims]) => {
      return {
        auth0_user,
        access_token,
        claims,
      };
    })
    .catch(() => {
      throw new Error("error retrieving auth details");
    });
}

export async function AWSConnect(options: AWSConnectOptions) {
  // Pass Auth0 authentication to Cognito
  AWS.config.region = options.aws_region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: options.aws_cognito_identity_pool_id,
    Logins: {
      [`${options.auth0_domain}`]: options.auth0_access_token,
    },
  });

  // Connect Amplify to Cognito and S3

  Amplify.configure({
    Auth: {
      identityPoolId: options.aws_cognito_identity_pool_id,
      region: options.aws_region,
    },
    Storage: {
      AWSS3: {
        bucket: options.aws_s3_bucket,
        region: options.aws_region,
      },
    },
  });

  // Tell Amplify to use Federated SignIn to connect to
  // Cognito Federated Entities (Auth0) https://bit.ly/301asxd

  try {
    await Auth.currentAuthenticatedUser();
  } catch (err) {
    Auth.federatedSignIn(
      options.auth0_domain,
      {
        token: options.auth0_id_token,
        expires_at: options.auth0_id_token_exp * 1000,
      },
      options.auth0_user
    );
  }
}
