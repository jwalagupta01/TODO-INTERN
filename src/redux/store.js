import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todo/todoSlice.js";

export const store = configureStore({
  reducer: {
    todo: todoSliceReducer,
  },
});
