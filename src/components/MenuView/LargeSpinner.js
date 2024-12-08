import React from "react";

const spinnerTime = "1s";

const LargeSpinner = ({ size = 48 }) => { // Default size set to 48px, double the original size
    // Calculate the height based on the width to maintain the aspect ratio
    // Assuming the original width:height ratio is 24:30 (or 4:5)
    const height = (size * 5) / 4;

    return (
      <div className="large-spinner loader loader--style6" title="5">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
             x="0px" y="0px" width={`${size}px`} height={`${height}px`} viewBox="0 0 24 30" style={{enableBackground: 'new 0 0 50 50'}}>
          <rect x="0" y="13" width="4" height="5" fill="#333">
            <animate attributeName="height" attributeType="XML"
              values="5;21;5" 
              begin="0s" dur={spinnerTime} repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML"
              values="13; 5; 13"
              begin="0s" dur={spinnerTime} repeatCount="indefinite" />
          </rect>
          <rect x="10" y="13" width="4" height="5" fill="#333">
            <animate attributeName="height" attributeType="XML"
              values="5;21;5" 
              begin="0.15s" dur={spinnerTime} repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML"
              values="13; 5; 13"
              begin="0.15s" dur={spinnerTime} repeatCount="indefinite" />
          </rect>
          <rect x="20" y="13" width="4" height="5" fill="#333">
            <animate attributeName="height" attributeType="XML"
              values="5;21;5" 
              begin="0.3s" dur={spinnerTime} repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML"
              values="13; 5; 13"
              begin="0.3s" dur={spinnerTime} repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    );
}

export default LargeSpinner;