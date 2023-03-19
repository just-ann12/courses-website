import React, { FC, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { Course } from "../types/previewCourses";
import { PAGE_SIZE } from "../utils/courses-constants";

import CourseCard from "./courseCard";

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
          <CourseCard key={course.id} course={course} />
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
