import React, { useState, useEffect, useRef } from 'react';

const LazyVideo = ({ src, type = "video/mp4" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        // Optional: Start playing when visible
        if (videoRef.current) {
          videoRef.current.play();
        }
        observer.disconnect();
      }
    });

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      width="100%"
      height="100%"
      loop
      style={{ objectFit: "cover" }}
      muted
      playsInline
      autoPlay
    >
      {isVisible && <source src={src} type={type} />}
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
