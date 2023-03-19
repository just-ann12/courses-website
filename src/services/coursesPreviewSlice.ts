import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../types/previewCourses";
import { fetchCourses } from "./thunks";

interface CoursesPreviewState {
  data: Course[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoursesPreviewState = {
  data: null,
  status: "idle",
  error: null,
};

export const coursesPreviewSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.courses;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch courses";
      });
  },
});

export default coursesPreviewSlice.reducer;
