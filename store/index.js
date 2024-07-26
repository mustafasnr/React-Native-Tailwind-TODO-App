import { configureStore } from "@reduxjs/toolkit";
import todo from "./todo";

const store = configureStore({
  reducer: { todoReducer: todo },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
