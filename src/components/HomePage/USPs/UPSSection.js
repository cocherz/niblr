import React from "react";
import USPItem from "./USPItem";

const USPSection = ({ content }) => {

  return (
    <div className="usp-section">
      {content.usps.map((usps, index) => (
        <USPItem key={index} icon={usps.img.url} heading={usps.title[0].text} copy={usps.copy[0].text} />
      ))}
    </div>
  );
};

export default USPSection;
