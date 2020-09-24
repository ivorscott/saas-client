import AWS from "aws-sdk";
import Amplify, { Auth } from "aws-amplify";
import { AWSConnectOptions, IdentityPayload, User } from "./types";

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

export async function AWSConnect(options: AWSConnectOptions) {
  // Pass Auth0 authentication to Cognito

  AWS.config.region = options.cognito_region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: options.cognito_identity_pool_id,
    Logins: {
      [`${options.auth0_domain}`]: options.auth0_access_token,
    },
  });

  // Connect Amplify to Cognito and S3

  Amplify.configure({
    Auth: {
      identityPoolId: options.cognito_identity_pool_id,
      region: options.cognito_region,
    },
    Storage: {
      AWSS3: {
        bucket: options.s3_bucket,
        region: options.s3_bucket_region,
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
