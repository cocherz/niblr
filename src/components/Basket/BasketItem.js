import React, { useState, useEffect } from "react";
import ListViewImage from "../ListView/components/ListViewImage";
import ListVeiwItem from "../ListView/components/ListViewItem";
import { ReactComponent as Close } from "../img/Close.svg";

const BasketItem = ({ item, onRemove, goToIndex, index, key }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [startX, setStartX] = useState(null);
  const [dragDistanceX, setDragDistanceX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeThreshold = 150; // px needed to trigger removal

  const handleRemoveClick = () => {
    triggerRemovalAnimation();
  };

  const triggerRemovalAnimation = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onRemove(index);
      setIsAnimatingOut(false);
    }, 500);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX);
    setIsDragging(true);
    setDragDistanceX(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].pageX;
    const diffX = currentX - startX;

    // Only track leftward swipes (diffX < 0)
    setDragDistanceX(diffX < 0 ? diffX : 0);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // If beyond threshold, trigger removal
    if (Math.abs(dragDistanceX) > swipeThreshold) {
      triggerRemovalAnimation();
    } else {
      // Snap back to original position
      setDragDistanceX(0);
    }
  };

  const itemStyle = {
    transform: `translateX(${dragDistanceX}px)`,
    transition: isDragging ? "none" : "transform 0.3s ease"
  };

  useEffect(() => {
    // Reset drag state whenever a new item replaces this one
    setDragDistanceX(0);
    setIsDragging(false);
  }, [key]);

  return (
    <section className="basket-item-container">
      {/* <div className="removeer"> removed </div> */}
    <div
      key={key}
      className={`option-container basket-item ${isAnimatingOut ? "remove-from-basket-animation" : ""}`}
      style={{ position: "relative", overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="option-content" style={{ ...itemStyle, position: "relative", zIndex: 1 }}>
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
    </div>
    </section>

  );
};

export default BasketItem;