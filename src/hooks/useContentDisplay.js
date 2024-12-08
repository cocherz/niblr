import { useState, useEffect } from 'react';

function useContentDisplay(items) {
  const [showImage, setShowImage] = useState({});

  useEffect(() => {
    items.forEach((item, index) => {
      if (item.content_image && item.content_image.url && item.item_video && item.item_video.url) {
        setShowImage(prevState => ({ ...prevState, [index]: true }));
        setTimeout(() => {
          setShowImage(prevState => ({ ...prevState, [index]: false }));
        }, 1);  // Display the image for 0.5 seconds
      }
    });
  }, [items]);

  return [showImage, setShowImage];
}

export default useContentDisplay;