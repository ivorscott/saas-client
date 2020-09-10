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

// A "Slice" creates actions, action creators, and reducer
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser(_, action) {
      return action.payload;
    },
  },
});

// Notes: redux toolkit usage
// console.log(authSlice);
// const { authenticateUser } = authSlice.actions;
// console.log(
//   authenticateUser({
//      id: "123",
//      firstName: "Ivor",
//      email: "jkasdh@jksdlh.com"
//   })
// );

export const { actions, reducer } = authSlice;
