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
