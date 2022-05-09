import { Auth0Client } from "@auth0/auth0-spa-js";
import { env } from "../../features/App/env";
import { Auth0User } from "./types";

interface AuthOptions {
  auth0_client_id: string;
  auth0_audience: string;
  auth0_domain: string;
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
  public identity?: any;
  public auth0_claims?: any;
  public redirect_uri: string;

  constructor(options: AuthOptions) {
    this.auth0_client_id = options.auth0_client_id;
    this.auth0_audience = options.auth0_audience;
    this.auth0_domain = options.auth0_domain;
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
  }

  async getAuthDetails() {
    return Promise.all([
      this.auth0Client.getUser() as Promise<Auth0User>,
      this.auth0Client.getTokenSilently() as Promise<string>,
      this.auth0Client.getIdTokenClaims(),
    ])
      .then(([identity, access_token, claims]) => {
        this.identity = identity;
        this.auth0_access_token = access_token;
        this.auth0_claims = claims;
        this.auth0_id_token = claims.__raw;
        this.auth0_id_token_exp = claims.exp as number;

        return {
          identity,
          access_token,
          claims,
        };
      })
      .catch(() => {
        throw new Error("error retrieving auth details");
      });
  }
}

export const client = new AuthService({
  auth0_client_id: env.AUTH0_CLIENT_ID,
  auth0_audience: env.AUTH0_AUDIENCE,
  auth0_domain: env.AUTH0_DOMAIN,
  redirect_uri: env.REDIRECT_URI,
});
