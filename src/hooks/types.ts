import { UseQueryResult } from "react-query";

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  company?: string;
  updatedAt: string;
  createdAt: string;
}

export type CurrentUser = User & {
  tenantID: string;
  company: string;
  accountOwner: boolean;
  username: string;
};

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

export interface DeleteUserInput {
  email: string;
  userId: string;
}

export interface SeatsAvailable {
  maxSeats: number;
  seatsAvailable: number;
}

export interface TableUser {
  id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  email: string;
  createdAt: string;
}

export type UserQuery = UseQueryResult<User[], Error>;
