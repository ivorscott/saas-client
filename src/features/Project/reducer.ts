import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loading, idle, pending, failed, succeeded } from "../../shared/types";
import { client } from "../../services/APIService";
import { history } from "../../history";
import { Project, Team } from "./types";

export interface ProjectState {
  selected: null | Project;
  team: null | Team;
  loading: loading;
}

const initialState: ProjectState = {
  selected: null,
  team: null,
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

export const fetchTeam = createAsyncThunk(
  "project/fetchOneTeam",
  async (id: string) => {
    return await client.get(`/projects/${id}/team`);
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

    addCase(fetchTeam.pending, (state, action) => {
      state.loading = pending;
    });

    addCase(fetchTeam.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.team = action.payload;
    });

    addCase(fetchTeam.rejected, (state, action) => {
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
