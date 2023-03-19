import React, { FC, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { Course } from "../types/previewCourses";
import { PAGE_SIZE } from "../utils/courses-constants";

import CourseDescriptionItem from "./courseDescriptionItem";

interface CourseCards {
  data: Course[];
}

const CourseCards: FC<CourseCards> = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const savedPage = localStorage.getItem("selectedPage");
  const currentPage = savedPage ? parseInt(savedPage) : 0;

  useEffect(() => {
    if (savedPage) {
      setOffset(parseInt(savedPage) * PAGE_SIZE);
    }
  }, [savedPage]);

  const handlePageChange = (selectedPage: number) => {
    setOffset(selectedPage * PAGE_SIZE);
    localStorage.setItem("selectedPage", selectedPage.toString());
  };

  const courses = data.slice(offset, offset + PAGE_SIZE);

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        {courses?.map((course: Course) => (
          <div
            key={course.id}
            className="text-xl rounded-lg border-2 border-courses-grey relative"
          >
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
              <CourseDescriptionItem
                title="Rating: "
                description={course.rating}
              />
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
        ))}
      </div>
      <nav className="my-8">
        <ReactPaginate
          pageCount={Math.ceil(data.length / PAGE_SIZE)}
          onPageChange={({ selected }) => handlePageChange(selected)}
          previousClassName="mr-3"
          nextClassName="ml-3"
          pageClassName="group"
          pageLinkClassName="p-3 text-courses-green bg-white border border-courses-green -ml-px group-[&:nth-child(2)]:rounded-l group-[&:nth-last-child(2)]:rounded-r hover:bg-courses-grey"
          activeClassName="active group"
          activeLinkClassName="group-[.active]:bg-courses-green group-[.active]:text-white group-[.active]"
          containerClassName="flex justify-center"
          forcePage={currentPage}
        />
      </nav>
    </>
  );
};

export default CourseCards;
