import packageJson from "../../../package.json";

export enum Env {
  BACKEND = "BACKEND",
  AUTH0_DOMAIN = "AUTH0_DOMAIN",
  AUTH0_AUDIENCE = "AUTH0_AUDIENCE",
  AUTH0_CLIENT_ID = "AUTH0_CLIENT_ID",
  REDIRECT_URI = "REDIRECT_URI",
  VERSION = "VERSION",
}

export interface Environment {
  [Env.BACKEND]: string;
  [Env.AUTH0_DOMAIN]: string;
  [Env.AUTH0_AUDIENCE]: string;
  [Env.AUTH0_CLIENT_ID]: string;
  [Env.REDIRECT_URI]: string;
  [Env.VERSION]: string;
}

type Maybe<T> = T | undefined;

function checkValue<T>(value: Maybe<T>, name: string): T {
  if (!value) {
    throw new ReferenceError(`${name} is undefined`);
  }
  return value;
}

function importFromEnv(key: string): string {
  const value = import.meta.env[`VITE__${key}`] as string;
  return checkValue<string>(value, key);
}

const env: Environment = {
  [Env.BACKEND]: importFromEnv(Env.BACKEND),
  [Env.AUTH0_DOMAIN]: importFromEnv(Env.AUTH0_DOMAIN),
  [Env.AUTH0_AUDIENCE]: importFromEnv(Env.AUTH0_AUDIENCE),
  [Env.AUTH0_CLIENT_ID]: importFromEnv(Env.AUTH0_CLIENT_ID),
  [Env.REDIRECT_URI]: window.location.origin,
  [Env.VERSION]: packageJson.version,
};

export { env };
