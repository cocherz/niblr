import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      loading="lazy"
      style={styles.image}
    />
  );
};

const styles = {
    image: {
      height: "100%",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };





export default LazyImage