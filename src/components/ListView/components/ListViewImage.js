import React, { useState } from 'react';
import Spinner from './Spinner';

const ListViewImage = ({ src, alt, src2 }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="lv-img-container noselectImg">
      {isLoading && <Spinner />} {/* Display your spinner here */}
      <img 
        src={src} 
        alt={alt} 
        style={{display: isLoading ? 'none' : 'block'}} // Hide the image while loading
        onLoad={() => setIsLoading(false)} // Hide spinner when image is loaded
      />
    </div>
  );
};

export default ListViewImage;  