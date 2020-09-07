import dev from "./dev";
import local from "./local";
import stage from "./stage";
import prod from "./prod";

type Environment = {
  backend: string | undefined;
  audience: string | undefined;
  clientId: string | undefined;
  domain: string | undefined;
};

let environment: Environment;

switch (process.env.REACT_APP_ENV) {
  case "local":
    environment = local;
    break;
  case "dev":
    environment = dev;
    break;
  case "stage":
    environment = stage;
    break;
  case "prod":
    environment = prod;
    break;
  default:
    throw new Error(
      `unknown environment is used: ${process.env.REACT_APP_ENV}`
    );
}

export default environment;
