import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./TaskSlice";
import darkModeSlice from "./DarkModeSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
    dark: darkModeSlice,
  },
});
