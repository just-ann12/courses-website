import React, { FC, useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import { Lesson } from "../types/course";

import VideoPlayer from "./lessonVideoPlayer";
import ProgressBar from "./progressBar";

interface LessonProps {
  lesson: Lesson;
}

const LessonItem: FC<LessonProps> = ({ lesson }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-1 border-gray-500 rounded-lg relative">
      <ProgressBar lesson={lesson} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 flex items-center justify-between w-full relative"
      >
        <div className="flex gap-4">
          <p className="text-xl font-semibold">{lesson.title}</p>

          {lesson.status === "locked" && (
            <div className="text-courses-red font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-courses-red rounded-full" />
              Locked
            </div>
          )}
        </div>
        {isOpen ? (
          <FaArrowAltCircleUp className="h-5 w-5 text-gray-500" />
        ) : (
          <FaArrowAltCircleDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && lesson.status === "unlocked" && (
        <div className="p-6 pt-0 w-full">
          <VideoPlayer classes="w-full" lesson={lesson} />
        </div>
      )}
    </div>
  );
};
export default LessonItem;
