import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./services/Auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
