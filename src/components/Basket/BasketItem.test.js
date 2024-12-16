import React, { useState, useEffect, useRef } from "react";
import ListViewImage from "../ListView/components/ListViewImage";
import ListVeiwItem from "../ListView/components/ListViewItem";
import { ReactComponent as Close } from "../img/Close.svg";

const BasketItem = ({ item, onRemove, goToIndex, index }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [startX, setStartX] = useState(null);
  const [dragDistanceX, setDragDistanceX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [height, setHeight] = useState("auto"); // State to control height during removal
  const itemRef = useRef(null); // Reference to access DOM height
  const swipeThreshold = 200; // Threshold to trigger swipe-to-remove

  /**
   * Handles the removal animation with height collapse.
   */
  const triggerRemovalAnimation = () => {
    if (itemRef.current) {
      setIsAnimatingOut(true); // Trigger animation class
  
      // Capture the current height before collapsing
      setHeight(`${itemRef.current.offsetHeight}px`);
  
      // Trigger height collapse
      requestAnimationFrame(() => {
        setHeight("0px"); // Collapse height smoothly
      });
  
      // Remove the item after the animation completes
      setTimeout(() => {
        onRemove(index);
        setHeight("auto"); // Reset height
        setIsAnimatingOut(false); // Reset animation state
      }, 500); // Match timeout to CSS transition duration
    }
  };

  /**
   * Handles the manual removal when clicking the remove button.
   */
  const handleRemoveClick = () => {
    triggerRemovalAnimation();
  };

  /**
   * Handles touch start event for swipe gesture.
   */
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX);
    setIsDragging(true);
    setDragDistanceX(0);
  };

  /**
   * Handles touch move event for swipe gesture.
   */
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].pageX;
    const diffX = currentX - startX;

    // Only allow leftward swipes
    setDragDistanceX(diffX < 0 ? diffX : 0);
  };

  /**
   * Handles touch end event to determine if removal should occur.
   */
  const handleTouchEnd = () => {
    setIsDragging(false);

    // Trigger removal if swipe distance exceeds threshold
    if (Math.abs(dragDistanceX) > swipeThreshold) {
      triggerRemovalAnimation();
    } else {
      setDragDistanceX(0); // Reset position if not removed
    }
  };

  /**
   * Style for swipe animation.
   */
  const itemStyle = {
    transform: `translateX(${dragDistanceX}px)`,
    transition: isDragging ? "none" : "transform 0.3s ease",
  };

  // Reset drag state when the item index changes
  useEffect(() => {
    setDragDistanceX(0);
    setIsDragging(false);
  }, [index]);

  return (
    <section
      className="basket-item-container"
      ref={itemRef}
      style={{
        height, // Use dynamic height for smooth collapse
        overflow: "hidden",
        transition: "height 0.4s ease-in-out, transform 0.3s ease",
      }}
    >
      <div
  className={`option-container basket-item ${
    isAnimatingOut ? "remove-from-basket-animation" : ""
  }`}
  style={{ position: "relative", overflow: "hidden" }}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
        <div className="option-content" style={{ ...itemStyle, position: "relative", zIndex: 1 }}>
          <div className="flex space-between">
            {/* Item content */}
            <div className="option" onClick={() => goToIndex(item.menuIndex, item.itemIndex)}>
              <ListViewImage src={item.content_image.url} />
              <ListVeiwItem item={item} showPriceAndChevron={false} />
            </div>

            {/* Remove button */}
            <div>
              <button className="removeButton flex noselect" onClick={handleRemoveClick}>
                <Close className="noselect small-cross" alt="Remove" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasketItem;