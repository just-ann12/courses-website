import React, { FC, useEffect, useState } from "react";
import cx from "classnames";
import { Lesson } from "../types/course";

interface ProgressBarProps {
  lesson: Lesson;
}

const ProgressBar: FC<ProgressBarProps> = ({ lesson }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = localStorage.getItem(lesson.id);
      if (video) {
        const parsedVideo = JSON.parse(video);
        const progressbar = (parsedVideo.progress / parsedVideo.duration) * 100;
        setProgress(progressbar);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [lesson.id, progress]);

  return (
    <div
      className={cx(
        "h-3 bg-courses-green rounded-tl-lg absolute top-0 left-0",
        {
          "rounded-t-lg": progress === 100,
        }
      )}
      style={{ width: `${progress}%` }}
    />
  );
};

export default ProgressBar;
