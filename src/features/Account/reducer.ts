import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, loading, failed, idle, succeeded } from "../../shared/types";
import { Storage } from "aws-amplify";

interface AccountState {
  loading: loading;
  image: string;
}

const initialState: AccountState = {
  loading: idle,
  image: "",
};

export const uploadImage = createAsyncThunk(
  "account/uploadImage",
  async (image: string) => {
    Storage.put("test.txt", "Hello")
      .then((result) => console.log(result)) // {key: "test.txt"}
      .catch((err) => console.log(err));
  }
);
export const fetchImage = createAsyncThunk("account/fetchImage", () => {});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchImage.pending, (state) => {
      state.loading = pending;
    });
    addCase(fetchImage.fulfilled, (state) => {
      state.loading = succeeded;
    });
    addCase(fetchImage.rejected, (state) => {
      state.loading = failed;
    });

    addCase(uploadImage.pending, (state) => {
      state.loading = pending;
    });
    addCase(uploadImage.fulfilled, (state) => {
      state.loading = succeeded;
    });
    addCase(uploadImage.rejected, (state) => {
      state.loading = failed;
    });
  },
});

export const { actions, reducer } = accountSlice;
