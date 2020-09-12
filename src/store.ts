import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./services/Auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // projects: projectReducer,
    // tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
