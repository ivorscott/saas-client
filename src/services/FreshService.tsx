import { env } from "../features/App/env";

const AUTHORIZATION_URL =
  "https://auth.freshbooks.com/service/auth/oauth/authorize";
const TOKEN_URL = "https://api.freshbooks.com/auth/oauth/token";
const API_URL = "https://api.freshbooks.com/auth/api/v1";

interface FBOptions {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  access_token?: string;
}

class FreshBooks {
  public client_id: string;
  public client_secret: string;
  public redirect_uri: string;
  public access_token?: string;

  constructor(options: FBOptions) {
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.redirect_uri = options.redirect_uri;
  }

  loginWithRedirect() {
    const params = `?client_id=${this.client_id}&response_type=code&redirect_uri=${this.redirect_uri}`;
    window.location.assign(`${AUTHORIZATION_URL}${params}`);
  }

  // verify freshbooks token by attempting to access users me endpoint
  async isTokenVerifed() {
    return new Promise<boolean>(async (resolve, reject) => {
      const token = localStorage.getItem("fbtk");

      if (!token) {
        reject();
      }

      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        this.access_token = token as string;
        resolve(true);
      }

      reject();
    }).catch((e) => {
      return false;
    });
  }

  async handleRedirect() {
    const { search } = window.location;

    if (!search.startsWith("?code=")) {
      return;
    }

    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: this.client_id,
        code: window.location.search.substr(6),
        client_secret: this.client_secret,
        redirect_uri: this.redirect_uri,
      }),
    });

    const json = await response.json();
    localStorage.setItem("fbtk", json.access_token);
  }
}

const options = {
  // TODO: add freshbooks
  client_id: "env.FRESHBOOKS_CLIENT_ID",
  client_secret: "env.FRESHBOOKS_CLIENT_SECRET",
  redirect_uri: "env.REDIRECT_URI",
};

export const client = new FreshBooks(options);
