import { KeyboardEventHandler, useEffect } from "react";
import Hls from "hls.js";

import { Lesson } from "../types/course";
import { SPEED_INCREMENT, TIME_INCREMENT } from "../utils/courses-constants";
import { Keyboard } from "../utils/keyboard.enum";

export const useVideoPlayer = (videoRef: any, lesson: Lesson) => {
  useEffect(() => {
    const video = videoRef.current;

    // Set up video player and load video source
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

    // Clean up video player and remove event listener
    return () => {
      const video = videoRef.current;
      if (video) {
        const hls = video.hls;
        if (hls) {
          hls.destroy();
        }
        video.removeEventListener("pause", saveProgress());
      }
    };
  }, [lesson.link, lesson.id]);

  const saveProgress = () => {
    const lessonData = {
      progress: videoRef.current?.currentTime || 0,
      duration: videoRef.current?.duration,
    };
    localStorage.setItem(lesson.id, JSON.stringify(lessonData));
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      saveProgress();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLVideoElement> = (event) => {
    const video = videoRef.current;

    if (video) {
      switch (event.key) {
        case Keyboard.ArrowLeft:
          video.currentTime -= TIME_INCREMENT;
          break;
        case Keyboard.ArrowRight:
          video.currentTime += TIME_INCREMENT;
          break;
        case Keyboard.ArrowUp:
          video.playbackRate += SPEED_INCREMENT;
          break;
        case Keyboard.ArrowDown:
          video.playbackRate -= SPEED_INCREMENT;
          break;
        default:
          return;
      }
    }
  };

  const handlePictureInPicture = () => {
    const video = videoRef.current;

    if (video?.requestPictureInPicture) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        video.requestPictureInPicture();
      }
    }
  };

  return { handleTimeUpdate, handleKeyDown, handlePictureInPicture };
};
