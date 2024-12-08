import React, { useState, useEffect } from "react";
import { PrismicRichText } from "@prismicio/react";
import config from "../../Config";
import mixpanel from "mixpanel-browser";
import HeartIcon from "../img/HeartIcon";
import DescKeys from "./DescKeys";
import Badges from "./Badges";

const shouldTruncateRichText = (data, limit) => {
  const allText = data.reduce((acc, block) => acc + (block.text || ""), "");
  return allText.length > limit;
};

const truncateRichTextData = (data, limit) => {
  let accumulatedLength = 0;
  return data.reduce((acc, block) => {
    if (accumulatedLength + block.text.length > limit && accumulatedLength < limit) {
      const remainingChars = limit - accumulatedLength;
      acc.push({ ...block, text: block.text.slice(0, remainingChars) + "..." });
      accumulatedLength += remainingChars; // Update the accumulated length to the limit
    } else if (accumulatedLength < limit) {
      acc.push(block);
      accumulatedLength += block.text.length;
    }
    return acc;
  }, []);
};

export const ItemDescription = ({ toggleItemInBasket, index, item, likedItems, menuIndex, itemIndex, currentMenu, catagoryName, menu, activeIndex, updateActiveIndex }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLiked = likedItems.has(item.content_image.url);
  const [iconIndex, setIconIndex] = useState(isLiked ? 1 : 0);
  const shouldTruncate = shouldTruncateRichText(item.item_text, 50);
  const displayData = isExpanded ? item.item_text : truncateRichTextData(item.item_text, 50);

  const shouldExpand = () => {
    if (shouldTruncate) {
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    const isLiked = likedItems.has(item.content_image.url);
    setIconIndex(isLiked ? 1 : 0);
  }, [likedItems, item.content_image.url]);

  return (
    <div className="itemDescriptionContainer">
      <Badges item={item} config={config} />
      <div className="noselect item-desc-top-row">
        <span className="itemTitle" onClick={() => shouldExpand()}>
          {item.title[0].text}
        </span>
        <div className="price-heart-container">
          <span className="itemTitle itemPrice"> {item.price ? "£" + item.price.toString() : null}</span>
          <button
            className={`${iconIndex === 1 ? "pulse-animation" : ""} heart-button`}
            onClick={() => {
              if (iconIndex === 0) {
                mixpanel.track("Liked item", {
                  Item: item.title[0].text,
                  Category: catagoryName,
                });
              }
              setIconIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
              toggleItemInBasket(item, index, menuIndex);
            }}
          >
            <HeartIcon fill={iconIndex === 1 ? "#fff" : "none"} className={`${iconIndex === 1 ? "pulse-animation" : ""} touch-btn-padding`} />
          </button>
        </div>
      </div>
      <div className="noselect itemDescription" onClick={() => shouldExpand()}>
        <PrismicRichText className="noselect" field={displayData} />
      </div>
      <DescKeys item={item} />
    </div>
  );
};

export default ItemDescription;