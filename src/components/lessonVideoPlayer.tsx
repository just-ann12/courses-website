import React, { useRef, FC } from "react";
import Hls from "hls.js";

import { useVideoPlayer } from "../hooks/useLessonVideoPlayer";
import { Lesson } from "../types/course";

interface VideoPlayerProps {
  lesson: Lesson;
  classes?: string;
}

interface CustomHTMLVideoElement extends HTMLVideoElement {
  hls?: Hls;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ lesson, classes }) => {
  const videoRef = useRef<CustomHTMLVideoElement>(null);

  const { handleTimeUpdate, handleKeyDown, handlePictureInPicture } =
    useVideoPlayer(videoRef, lesson);

  return (
    <div className={classes}>
      <video
        id={`video-${lesson.id}`}
        ref={videoRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        className="object-cover h-auto w-full"
        onKeyDown={handleKeyDown}
        onClick={handlePictureInPicture}
      />
      <div className="text-sm mt-2">
        Use arrow Up and Down to increase or decrease the video speed. Also, you
        can use arrow left and right to move 5 seconds back or forward.
      </div>
    </div>
  );
};

export default VideoPlayer;
