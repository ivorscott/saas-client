// TODO: Replace Auth0 with AWS Cognito - Use AWS Amplify
import { User as UserType } from "./types";
export { AuthProvider } from "./AuthProvider";
export { client } from "./AuthService";
export type User = UserType;
