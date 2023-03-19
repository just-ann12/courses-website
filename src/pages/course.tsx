import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCourseById } from "../services/thunks";
import { AppDispatch, RootState } from "../services/store";

import { convertSeconds } from "../utils/converSeconds";

import Container from "../shared/container";
import Loader from "../shared/loader";
import VideoPlayer from "../components/lessonVideoPlayer";
import LessonItem from "../components/lesson";
import CourseDescriptionItem from "../components/courseDescriptionItem";
import Banner from "../shared/banner";

const Course = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.course
  );
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <p className="mt-6 ml-6">No courses are here...yet</p>;
  }

  return (
    <div className="w-full">
      <Banner
        title={data?.title}
        description={data?.description}
        heightValue="70vh"
        video={
          <VideoPlayer lesson={data?.lessons[0]} classes="w-3/5 self-center" />
        }
      />
      <Container classes="py-8">
        <p className="mb-4 text-2xl font-semibold">
          Вasic information about the course:
        </p>
        <CourseDescriptionItem
          title="Duration: "
          description={convertSeconds(data?.duration)}
          classes="mb-2 text-xl"
        />
        <CourseDescriptionItem
          title="Rating: "
          description={data.rating}
          classes="mb-2 text-xl"
        />
        <CourseDescriptionItem
          title="Skills: "
          description={
            data.meta.skills.length === 1
              ? data.meta.skills.map((skill: string) => skill.toLowerCase())
              : data.meta.skills.map(
                  (skill: string) => `${skill.toLowerCase()}, `
                )
          }
          classes="mb-4 text-xl"
        />

        <div className="flex flex-col gap-4">
          {data?.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Course;
