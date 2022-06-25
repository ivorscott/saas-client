export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  roles?: string[];
  company?: string;
  updatedAt: string;
  createdAt: string;
}

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

export type UserPayload = User & {
  error?: string;
};
