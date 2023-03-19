import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Course from "./pages/course";
import CoursesPreview from "./pages/previewCourses";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CoursesPreview />} />
        <Route path="/:courseId" element={<Course />} />
      </Routes>
    </>
  );
};

export default App;
