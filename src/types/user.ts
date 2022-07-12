import { UseQueryResult } from "react-query";

import { ConnectionMap } from "./tenant";

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

export interface UserDict {
  [index: string]: User;
}

export type CurrentUser = User & {
  tenantId: string;
  company: string;
  accountOwner: boolean;
  connections: ConnectionMap;
  username: string;
};

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

export interface DeleteUserInput {
  userId: string;
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
