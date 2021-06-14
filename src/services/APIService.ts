import { client as authClient } from "./AuthService";
import { env } from "../features/App/env";

class APIService {
  public baseUrl: string;

  constructor() {
    this.baseUrl = env.BACKEND;
  }

  post(path: string, data: any) {
    return this.request("POST", path, data);
  }

  put(path: string, data: any) {
    return this.request("PUT", path, data);
  }

  patch(path: string, data: any) {
    return this.request("PATCH", path, data);
  }

  get(path: string) {
    return this.request("GET", path);
  }

  delete(path: string) {
    return this.request("DELETE", path);
  }

  get headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Strict-Transport-Security": "max-age=15768000;includeSubdomains",
    };
  }

  async request(method: string, path: string, data?: any) {
    const url = `${this.baseUrl}${path}`;
    const accessToken = await authClient.getTokenSilently();
    const options = {
      method,
      body: JSON.stringify(data),
      headers: {
        ...this.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return fetch(url, options).then(async (res) => {
      const type = res.headers.get("content-type");
      if (!res.ok) {
        throw new Error(`(${res.status}) ${res.statusText}`);
      }
      return type && type.includes("application/json") && res.json();
    });
  }
}

export const client = new APIService();
