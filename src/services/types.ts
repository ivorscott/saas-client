export interface User {
  id: string;
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

export type UserPayload = User & {
  error?: string;
};
