import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./services/Auth";
import { projectsReducer } from "./features/Projects";
// import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    // columns: columnsReducer,
    // tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

export { store };
