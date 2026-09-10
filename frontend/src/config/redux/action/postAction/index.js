import { createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../../index";

export const loginUser = createAsyncThunk(
  "user/ login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPost",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/posts");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
