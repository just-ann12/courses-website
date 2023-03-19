import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCourses } from "../services/thunks";
import { AppDispatch, RootState } from "../services/store";

import Banner from "../shared/banner";
import Loader from "../shared/loader";
import Container from "../shared/container";
import CourseCards from "../components/courseCards";

const PreviewCourses = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, status, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Banner title="Courses" description="LEARN WITHOUT LIMITS" />
      <Container classes="py-8">
        {status === "loading" && <Loader />}

        {status === "failed" && <div>{error}</div>}

        {data && <CourseCards data={data} />}
      </Container>
    </div>
  );
};

export default PreviewCourses;
