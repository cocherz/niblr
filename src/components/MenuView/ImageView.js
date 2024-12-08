import React, { useState } from "react";
import LargeSpinner from "./LargeSpinner";

const ImageView = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="item-image noselect ">
      {isLoading && <LargeSpinner />}
      <img className="image noselectImg" src={src} alt={alt} 
      // loading="lazy"
       style={{ display: isLoading ? "none" : "block" }} onLoad={() => setIsLoading(false)} />
    </div>
  );
};

export default ImageView;
