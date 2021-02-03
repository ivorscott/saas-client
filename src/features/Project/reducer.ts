import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loading, idle, pending, failed, succeeded } from "../../shared/types";
import { client } from "../../services/APIService";
import { history } from "../../history";

export interface Project {
  id: string;
  name: string;
  open: string;
  userId: string;
  columnOrder: string[];
  created: string;
}

export interface ProjectState {
  selected: null | Project;
  loading: loading;
}

const initialState: ProjectState = {
  selected: null,
  loading: idle,
};

export const fetchProject = createAsyncThunk(
  "project/fetchOne",
  async (id: string) => {
    const result = await client.get(`/projects/${id}`);
    if (result.error) {
      history.push("/manage/projects");
    }
    return result;
  }
);

export const createProject = createAsyncThunk(
  "project/create",
  async (name: string) => {
    return (await client.post("/projects", { name })) as Project;
  }
);

export const deleteProject = createAsyncThunk(
  "project/update",
  async (id: string) => {
    return await client.delete(`/projects/${id}`);
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action) {
      return {
        ...state,
        selected: action.payload,
      };
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchProject.pending, (state) => {
      state.loading = pending;
    });
    addCase(fetchProject.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.selected = action.payload;
    });
    addCase(fetchProject.rejected, (state) => {
      state.loading = failed;
    });

    addCase(createProject.pending, (state) => {
      state.loading = pending;
    });
    addCase(createProject.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.selected = action.payload;
    });
    addCase(createProject.rejected, (state) => {
      state.loading = failed;
    });

    addCase(deleteProject.pending, (state) => {
      state.loading = pending;
    });
    addCase(deleteProject.fulfilled, (state) => {
      state.loading = succeeded;
      state.selected = null;
    });
    addCase(deleteProject.rejected, (state) => {
      state.loading = failed;
    });
  },
});

export const { actions, reducer } = projectSlice;
