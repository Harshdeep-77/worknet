import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer";
import { getAllPosts } from "./action/postAction";
/**
 * STEPS for State Management using Redux Toolkit
 * 1.submit actions
 * 2.handle actions in reducers
 * 3.register here ->reducers
 *
 *
 *
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
