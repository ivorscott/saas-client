import packageJson from "../package.json";

export enum Env {
  BACKEND = "BACKEND",
  FRESHBOOKS_CLIENT_ID = "FRESHBOOKS_CLIENT_ID",
  FRESHBOOKS_CLIENT_SECRET = "FRESHBOOKS_CLIENT_SECRET",
  AWS_COGNITO_IDENTITY = "AWS_COGNITO_IDENTITY",
  AWS_REGION = "AWS_REGION",
  AWS_S3_BUCKET = "AWS_S3_BUCKET",
  AUTH0_DOMAIN = "AUTH0_DOMAIN",
  AUTH0_AUDIENCE = "AUTH0_AUDIENCE",
  AUTH0_CLIENT_ID = "AUTH0_CLIENT_ID",
  REDIRECT_URI = "REDIRECT_URI",
  VERSION = "VERSION",
}

export interface Environment {
  [Env.BACKEND]: string;
  [Env.FRESHBOOKS_CLIENT_ID]: string;
  [Env.FRESHBOOKS_CLIENT_SECRET]: string;
  [Env.AWS_COGNITO_IDENTITY]: string;
  [Env.AWS_REGION]: string;
  [Env.AWS_S3_BUCKET]: string;
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
  const value = process.env[`REACT_APP__${key}`];
  return checkValue<string>(value, key);
}

const env: Environment = {
  [Env.BACKEND]: importFromEnv(Env.BACKEND),
  [Env.FRESHBOOKS_CLIENT_ID]: importFromEnv(Env.FRESHBOOKS_CLIENT_ID),
  [Env.FRESHBOOKS_CLIENT_SECRET]: importFromEnv(Env.FRESHBOOKS_CLIENT_SECRET),
  [Env.AWS_COGNITO_IDENTITY]: importFromEnv(Env.AWS_COGNITO_IDENTITY),
  [Env.AWS_REGION]: importFromEnv(Env.AWS_REGION),
  [Env.AWS_S3_BUCKET]: importFromEnv(Env.AWS_S3_BUCKET),
  [Env.AUTH0_DOMAIN]: importFromEnv(Env.AUTH0_DOMAIN),
  [Env.AUTH0_AUDIENCE]: importFromEnv(Env.AUTH0_AUDIENCE),
  [Env.AUTH0_CLIENT_ID]: importFromEnv(Env.AUTH0_CLIENT_ID),
  [Env.REDIRECT_URI]: window.location.origin,
  [Env.VERSION]: packageJson.version,
};

export { env };
