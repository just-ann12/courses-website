import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { Course } from "../types/course";

export const fetchCourses = createAsyncThunk(
  "courses/fetchPreviewCourses",
  async () => {
    try {
      const response = await api.get("/preview-courses");
      return {
        courses: response.data.courses,
      };
    } catch (error) {
      throw new Error("Failed to fetch courses");
    }
  }
);

export const fetchCourseById = createAsyncThunk<Course, string>(
  "courses/fetchById",
  async (id: string) => {
    try {
      const response = await api.get(`/preview-courses/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch the course");
    }
  }
);
