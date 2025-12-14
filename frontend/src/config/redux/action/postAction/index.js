import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/ login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
