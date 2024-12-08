import { useEffect, useRef, useState } from 'react';

function useVideoVisibility(items) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const currentVideos = videoRefs.current;
    const pauseTimeouts = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = currentVideos.indexOf(entry.target);
          if (entry.isIntersecting) {
            clearTimeout(pauseTimeouts[videoIndex]);
            entry.target.play().catch((error) => {
              console.warn("Play request was interrupted:", error);
            });
            setActiveVideoIndex(videoIndex);
          } else {
            pauseTimeouts[videoIndex] = setTimeout(() => {
              entry.target.pause();
            }, 10);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    currentVideos.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      currentVideos.forEach((video) => {
        observer.unobserve(video);
      });
      Object.values(pauseTimeouts).forEach(clearTimeout);
    };
  }, [activeVideoIndex]);

  return [activeVideoIndex, videoRefs];
}

export default useVideoVisibility;