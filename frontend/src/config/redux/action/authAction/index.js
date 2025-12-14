import { createAsyncThunk } from "@reduxjs/toolkit";

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
        return thunkAPI.rejectWithValue("Login failed")({
          message: "Token not found",
        });
      }
      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser =
  createAsyncThunk();
  //   "user/register",
  //   async (user, thunkAPI) => {
  //     try {
  //       const response = await clientServer.post("/login", {
  //         password: user.password,
  //         email: user.email,
  //       });
  //       if (response.data.token) {
  //         localStorage.setItem("token", response.data.token);
  //       } else {
  //         return thunkAPI.rejectWithValue("Login failed")({
  //           message: "Token not found",
  //         });
  //       }
  //       return thunkAPI.fulfillWithValue(response.data.token);
  //     } catch (error) {
  //       return thunkAPI.rejectWithValue(error.response.data);
  //     }
  //   }
