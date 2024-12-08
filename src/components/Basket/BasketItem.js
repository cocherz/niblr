import React, { useState } from "react";
import ListViewImage from "../ListView/components/ListViewImage";
import ListVeiwItem from "../ListView/components/ListViewItem";
import { ReactComponent as Close } from "../img/Close.svg";

const BasketItem = ({  item, onRemove, goToIndex, index }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleRemoveClick = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onRemove(index);
      setIsAnimatingOut(false);
    }, 500);
  };

  return (
    <div key={index} className={`option-container  ${isAnimatingOut ? "animate-out" : ""}`}>
      <div className="flex space-between">        
        <div className="option" onClick={() => goToIndex(item.menuIndex, item.itemIndex)}>
          <ListViewImage src={item.content_image.url} />
          <ListVeiwItem item={item} showPriceAndChevron={false} />
        </div>
        <div> 
            <button className="removeButton flex noselect" onClick={handleRemoveClick}>
              <Close className="noselect small-cross" alt="" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
