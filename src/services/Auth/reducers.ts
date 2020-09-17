import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth0Id: "",
  email: "",
  emailVerified: false,
  firstName: "",
  lastName: "",
  picture: "",
  locale: "",
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
