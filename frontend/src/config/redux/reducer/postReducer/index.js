import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction";

const initialState = {
  posts: [],
  postFetched: false,
  loggedIn: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  comments: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "fetching posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.posts;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.postFetched = true;
        state.message = action.payload;
      });
  },
});

export default postSlice.reducer;
