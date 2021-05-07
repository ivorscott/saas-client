export interface User {
  id: string;
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  roles?: string[];
  updatedAt: string;
  createdAt: string;
}

export interface Auth0User {
  sub: string;
  email: string;
  email_verified: boolean;
  nickname: string;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
}

export type UserPayload = User & {
  error?: string;
};
