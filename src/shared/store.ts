import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../services/AuthService";
import { accountReducer } from "../features/Account";
import { projectsReducer } from "../features/Projects";
import { projectReducer } from "../features/Project";
// import { reducer as formReducer } from "redux-form";

const store = configureStore({
  reducer: {
    // form: formReducer,
    auth: authReducer,
    project: projectReducer,
    projects: projectsReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
