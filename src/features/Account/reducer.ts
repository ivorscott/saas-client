import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, loading, failed, idle, succeeded } from "../../shared/types";
import { Storage } from "aws-amplify";
import { placeholder } from "./Avatar/placeholder";

interface AccountState {
  loading: loading;
  image: string;
}

const initialState: AccountState = {
  loading: idle,
  image: "",
};

interface S3GetPayload {
  Body: Blob;
}

export const uploadImage = createAsyncThunk(
  "account/uploadImage",
  async ({ blob, auth0Id }: { blob: Blob; auth0Id: string }) => {
    var file = new File([blob], "profile.png");
    Storage.put(`${auth0Id}/${file.name}`, file, {
      contentType: blob.type,
    });
    return await new Response(blob).text();
  }
);

export const fetchImage = createAsyncThunk(
  "account/fetchImage",
  async (auth0Id: string) => {
    const key = `${auth0Id}/profile.png`;
    const result = (await Storage.get(key, {
      download: true,
    })) as S3GetPayload;
    return await new Response(result.Body).text();
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchImage.pending, (state) => {
      state.loading = pending;
    });
    addCase(fetchImage.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.image = action.payload;
    });
    addCase(fetchImage.rejected, (state) => {
      state.loading = failed;
      state.image = placeholder;
    });

    addCase(uploadImage.pending, (state) => {
      state.loading = pending;
    });
    addCase(uploadImage.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.image = action.payload;
    });
    addCase(uploadImage.rejected, (state) => {
      state.loading = failed;
    });
  },
});

export const { actions, reducer } = accountSlice;
