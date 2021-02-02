import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  auth0Id: "",
  email: "",
  emailVerified: false,
  accountingEnabled: false,
  firstName: "",
  lastName: "",
  picture: "",
  locale: "",
  created: "",
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
