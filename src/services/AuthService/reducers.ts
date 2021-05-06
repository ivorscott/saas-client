import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  id: string;
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  updatedAt: string;
  createdAt: string;
  roles: string[];
}

const initialState: AuthState = {
  id: "",
  auth0Id: "",
  email: "",
  emailVerified: false,
  firstName: "",
  lastName: "",
  picture: "",
  locale: "",
  updatedAt: "",
  createdAt: "",
  roles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser(_, action) {
      return action.payload;
    },
  },
});

export const { actions, reducer } = authSlice;
