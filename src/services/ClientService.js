import { auth0Client } from "./Auth/AuthService";
import env from "../env";

class ClientService {
  constructor() {
    this.baseUrl = env.backend;
  }

  post(path, data) {
    return this.request("POST", path, data);
  }

  put(path, data) {
    return this.request("PUT", path, data);
  }

  patch(path, data) {
    return this.request("PATCH", path, data);
  }

  get(path) {
    return this.request("GET", path);
  }

  delete(path) {
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

  async request(method, path, data) {
    const url = `${this.baseUrl}${path}`;
    const token = await auth0Client.getTokenSilently();
    const options = {
      method,
      body: JSON.stringify(data),
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    return window
      .fetch(url, options)
      .then((res) => {
        if (!res.headers.get("Content-Type").includes("application/json")) {
          throw new Error(`(${res.status}) Got html response from resource`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(`(${res.status}) ${JSON.stringify(res.error)}`);
        }
        return res;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
export default new ClientService();
