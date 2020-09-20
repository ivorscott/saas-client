import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loading, idle, pending, failed, succeeded } from "../../shared/types";
import { client } from "../../services/Client";
import { createProject, Project } from "../Project";

interface ProjectsState {
  entities: Project[];
  loading: loading;
}

const initialState: ProjectsState = {
  entities: [],
  loading: idle,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async () => (await client.get("/projects")) as Project[]
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchProjects.pending, (state) => {
      state.loading = pending;
    });
    addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.entities = action.payload;
    });
    addCase(fetchProjects.rejected, (state) => {
      state.loading = failed;
      state.entities = [];
    });
    addCase(createProject.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.entities = [...state.entities, action.payload];
    });
  },
});

export const { actions, reducer } = projectsSlice;
