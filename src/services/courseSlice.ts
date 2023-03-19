import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../types/course";
import { fetchCourseById } from "./thunks";

interface CourseState {
  data: Course | null;
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: CourseState = {
  data: null,
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
