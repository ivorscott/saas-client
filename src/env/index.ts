import dev from "./dev";
import local from "./local";
import stage from "./stage";
import prod from "./prod";

type Environment = {
  backend: string | undefined;
  domain: string | undefined;
  audience: string | undefined;
  client_id: string | undefined;
  redirect_uri: string | undefined;
  identity_pool_id: string | undefined;
  cognito_region: string | undefined;
  s3_bucket: string | undefined;
  s3_bucket_region: string | undefined;
  freshbooks_client_id: string | undefined;
  freshbooks_client_secret: string | undefined;
  freshbooks_authorization_url: string | undefined;
  freshbooks_token_url: string | undefined;
  freshbooks_api_url: string | undefined;
};

let env: Environment;

switch (process.env.REACT_APP_ENV) {
  case "local":
    env = local;
    break;
  case "dev":
    env = dev;
    break;
  case "stage":
    env = stage;
    break;
  case "prod":
    env = prod;
    break;
  default:
    throw new Error(
      `unknown environment is used: ${process.env.REACT_APP_ENV}`
    );
}

export { env };
