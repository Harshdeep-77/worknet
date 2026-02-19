import { createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../../index";

export const loginUser = createAsyncThunk(
  "user/ login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        password: user.password,
        email: user.email,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Token not found",
        });
      }
      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/register", {
        username: user.userName,
        password: user.password,
        email: user.email,
        name: user.name,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Token not found",
        });
      }
      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
