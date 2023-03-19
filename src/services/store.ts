import { configureStore } from "@reduxjs/toolkit";
import previewCoursesSlice from "./coursesPreviewSlice";
import courseSlice from "./courseSlice";

export const store = configureStore({
  reducer: {
    courses: previewCoursesSlice,
    course: courseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
