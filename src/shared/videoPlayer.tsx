import React, { useRef, FC, useEffect } from "react";
import Hls from "hls.js";

import { useVideoPlayer } from "../hooks/useVideoPlayer";
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

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const existingData = localStorage.getItem(lesson.id);

      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const savedProgress = parsedData.progress;
        if (savedProgress !== undefined) {
          video.currentTime = savedProgress;
        }
      } else {
        video.currentTime = 0;
      }

      const hls = new Hls();
      hls.loadSource(lesson.link);
      hls.attachMedia(video);
      video.hls = hls;
    }

    return () => {
      const video = videoRef.current;
      if (video) {
        const hls = video.hls;
        if (hls) {
          hls.destroy();
        }
      }
    };
  }, [lesson.link, lesson.id]);

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
      <div className="text-sm">
        Use arrow Up and Down to increase or decrease the video speed. Also, you
        can use arrow left and right to move 5 seconds back or forward.
      </div>
    </div>
  );
};

export default VideoPlayer;
