export interface AWSConnectOptions {
  auth0_user: IdentityPayload;
  auth0_domain: string;
  auth0_id_token: string;
  auth0_id_token_exp: number;
  auth0_access_token: string;
  cognito_identity_pool_id: string;
  cognito_region: string;
  s3_bucket: string;
  s3_bucket_region: string;
}

export interface User {
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  roles: string[];
}

export interface CommonFields {
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface GoogleOauth2 extends CommonFields {
  given_name: string;
  family_name: string;
  locale: string;
}

export interface UsernamePasswordAuthentication extends CommonFields {}
export type IdentityPayload = UsernamePasswordAuthentication & GoogleOauth2;
export type UserPayload = User & {
  error?: string;
};
