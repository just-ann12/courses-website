import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Course } from "../types/previewCourses";

import CourseDescriptionItem from "./courseDescriptionItem";

interface CourseCard {
  course: Course;
}

const CourseCard: FC<CourseCard> = ({ course }) => {
  return (
    <div className="text-xl rounded-lg border-2 border-courses-grey relative">
      <img
        src={course.previewImageLink + "/cover.webp"}
        className="rounded-t-lg w-full"
      />
      <div className="m-8 flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {course.title}
        </h2>
        <CourseDescriptionItem
          title="Description: "
          description={course.description}
        />
        <CourseDescriptionItem
          title="Number of lessons: "
          description={course.lessonsCount}
        />
        <CourseDescriptionItem title="Rating: " description={course.rating} />
        {course.meta.skills && (
          <CourseDescriptionItem
            title="Skills: "
            description={
              course.meta.skills.length === 1
                ? course?.meta.skills.map(
                    (skill: string) => `${skill.toLowerCase()}.`
                  )
                : course.meta.skills
                    .map((skill: string, index: number) =>
                      index === course.meta.skills.length - 1
                        ? `${skill.toLowerCase()}.`
                        : `${skill.toLowerCase()}, `
                    )
                    .join("")
            }
            classes="mb-14"
          />
        )}
      </div>
      <button className="text-xl bg-courses-green text-white rounded-lg py-2 px-6 mb-8 ml-8 absolute bottom-0 ">
        <Link to={`/${course.id}`}>Start Learning</Link>
      </button>
    </div>
  );
};

export default CourseCard;
