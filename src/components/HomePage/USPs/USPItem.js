import React from "react";

const USPItem = ({ heading, copy, icon }) => {
  return (
    <div className="usp-item">
      <div className="usp-icon-container">
        <img className="usp-icon" alt="" src={icon}/>
      </div>
      <h2 className="usp-tile subheading">
        {heading}
      </h2>
      <div className='hero-subtitle'>{copy}</div>
    </div>
  );
};

export default USPItem;
