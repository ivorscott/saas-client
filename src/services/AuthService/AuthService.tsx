// import AWS from "aws-sdk";
// import Amplify, { Auth } from "aws-amplify";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { env } from "../../shared/env";
import { IdentityPayload } from "./types";

interface AuthOptions {
  auth0_client_id: string;
  auth0_audience: string;
  auth0_domain: string;
  // aws_region: string;
  // aws_s3_bucket: string;
  // aws_cognito_identity_pool_id: string;
  redirect_uri: string;
}

class AuthService {
  public auth0Client: Auth0Client;
  public auth0_client_id: string;
  public auth0_audience: string;
  public auth0_domain: string;
  public auth0_access_token?: string;
  public auth0_id_token?: string;
  public auth0_id_token_exp?: number;
  public auth0_user?: any;
  public auth0_claims?: any;

  // public aws_region: string;
  // public aws_s3_bucket: string;
  // public aws_cognito_identity_pool_id: string;

  public redirect_uri: string;

  constructor(options: AuthOptions) {
    this.auth0_client_id = options.auth0_client_id;
    this.auth0_audience = options.auth0_audience;
    this.auth0_domain = options.auth0_domain;
    // this.aws_region = options.aws_region;
    // this.aws_cognito_identity_pool_id = options.aws_cognito_identity_pool_id;
    // this.aws_s3_bucket = options.aws_s3_bucket;
    this.redirect_uri = options.redirect_uri;

    this.auth0Client = new Auth0Client({
      domain: this.auth0_domain,
      audience: this.auth0_audience,
      client_id: this.auth0_client_id,
      redirect_uri: this.redirect_uri,
      useRefreshTokens: true,
    });
  }

  loginWithRedirect(pathname?: string, hint?: string) {
    return this.auth0Client.loginWithRedirect({
      appState: pathname,
      login_hint: hint,
    });
  }

  handleRedirectCallback() {
    return this.auth0Client.handleRedirectCallback();
  }

  isAuthenticated() {
    return this.auth0Client.isAuthenticated();
  }

  getTokenSilently() {
    return this.auth0Client.getTokenSilently();
  }

  logout() {
    this.auth0Client.logout();
    // Auth.signOut();
  }

  async getAuthDetails() {
    return Promise.all([
      this.auth0Client.getUser() as Promise<IdentityPayload>,
      this.auth0Client.getTokenSilently() as Promise<string>,
      this.auth0Client.getIdTokenClaims(),
    ])
      .then(([auth0_user, access_token, claims]) => {
        this.auth0_user = auth0_user;
        this.auth0_access_token = access_token;
        this.auth0_claims = claims;
        this.auth0_id_token = claims.__raw;
        this.auth0_id_token_exp = claims.exp as number;

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

  // async AWSConnect() {
  //   if (
  //     !(
  //       this.auth0_access_token &&
  //       this.auth0_id_token &&
  //       this.auth0_id_token_exp &&
  //       this.auth0_user
  //     )
  //   ) {
  //     throw new Error(
  //       "AWSConnect() failed because of missing requirements. Make sure to call getAuthDetails() first."
  //     );
  //   }

  // Notify Cognito about Auth0 Login

  // AWS.config.region = this.aws_region;
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: this.aws_cognito_identity_pool_id,
  //   Logins: {
  //     [`${this.auth0_domain}`]: this.auth0_access_token,
  //   },
  // });

  // Connect Amplify to Cognito and S3

  // Amplify.configure({
  //   Auth: {
  //     identityPoolId: this.aws_cognito_identity_pool_id,
  //     region: this.aws_region,
  //   },
  //   Storage: {
  //     AWSS3: {
  //       bucket: this.aws_s3_bucket,
  //       region: this.aws_region,
  //     },
  //   },
  // });

  // Tell Amplify to use Federated SignIn to connect to
  // Cognito Federated Entities (Auth0) https://bit.ly/301asxd

  // try {
  //   await Auth.currentAuthenticatedUser();
  // } catch (err) {
  //   Auth.federatedSignIn(
  //     this.auth0_domain,
  //     {
  //       token: this.auth0_id_token,
  //       expires_at: this.auth0_id_token_exp * 1000,
  //     },
  //     this.auth0_user
  //   );
  // }
  //   }
}

export const client = new AuthService({
  auth0_client_id: env.AUTH0_CLIENT_ID,
  auth0_audience: env.AUTH0_AUDIENCE,
  auth0_domain: env.AUTH0_DOMAIN,
  // aws_region: env.AWS_REGION,
  // aws_s3_bucket: env.AWS_S3_BUCKET,
  // aws_cognito_identity_pool_id: env.AWS_COGNITO_IDENTITY,
  redirect_uri: env.REDIRECT_URI,
});
