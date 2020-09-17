import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../services/Client";

export interface Project {
  id: string;
  name: string;
  open: string;
  userId: string;
  columnOrder: string;
  created: string;
}

export type loading = "idle" | "pending" | "succeeded" | "failed";

interface ProjectsState {
  projects: Project[];
  project: null | Project;
  loading: loading;
}

const initialState: ProjectsState = {
  projects: [],
  project: null,
  loading: "idle",
};

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchAll",
  async () => await client.get("/projects")
);

export const createProject = createAsyncThunk<Project, string>(
  "projects/create",
  async (name) => {
    return await client.post("/projects", { name });
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProject(state, action) {
      return {
        ...state,
        project: action.payload,
      };
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchProjects.pending, (state) => {
      state.loading = "pending";
    });
    addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projects = action.payload;
    });
    addCase(fetchProjects.rejected, (state) => {
      state.loading = "failed";
      state.projects = [];
    });

    addCase(createProject.pending, (state) => {
      state.loading = "pending";
    });
    addCase(createProject.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.project = action.payload;
      state.projects = [...state.projects, action.payload];
    });
    addCase(createProject.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const { actions, reducer } = projectsSlice;
