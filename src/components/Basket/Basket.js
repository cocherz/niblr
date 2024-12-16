import React, { useState, useEffect, useRef } from "react";
import BasketItem from "./BasketItem";
import FooterCopy from "../ListView/components/FooterCopy";
import LineBreak from "../ListView/components/LineBreak";
import CreatedBy from "../LoadingScreen/Components/CreatedBy";
import BasketEmpty from "./BasketEmpty";
import BasketNav from "./BasketNav";

const Basket = ({
  items = [],
  closeBasket,
  setScrollToItemIndex,
  setActiveIndex,
  isBackdropVisible,
  onRemove
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startY, setStartY] = useState(null);
  const [dragDistance, setDragDistance] = useState(window.innerHeight); // Start off-screen
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const basketRef = useRef(null);
  const swipeThreshold = 150;

  useEffect(() => {
    // On mount, trigger the basket to slide in
    requestAnimationFrame(() => {
      setIsAnimating(true);
      setDragDistance(0);
    });
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setIsAnimating(false);
    setDragDistance(window.innerHeight); // Move downward off-screen
    setTimeout(() => {
      closeBasket();
    }, 400);
  };

  const goToIndex = (menuIndex, itemIndex) => {
    setActiveIndex(menuIndex);
    setScrollToItemIndex(itemIndex);
    handleClose();
  };
  const DRAG_START_ZONE = 45; // px from the top

  const handleTouchStart = (e) => {
    if (isClosing) return;
    
    const touchY = e.touches[0].pageY;
    const basketRect = basketRef.current.getBoundingClientRect();
    
    // Only start dragging if user's initial touch is near the top handle area
    if (touchY - basketRect.top <= DRAG_START_ZONE) {
      setStartY(touchY);
      setDragDistance(0);
      setIsDragging(true);
    }
  };
  const handleTouchMove = (e) => {
    if (startY === null || isClosing) return;
    const currentY = e.touches[0].pageY;
    let diffY = currentY - startY;
    
    // Apply resistance after 50px, making it harder to pull further
    if (diffY > 50) {
      diffY = 50 + (diffY - 50) * 0.5; // half speed after 50px
    }
    
    setDragDistance(diffY > 0 ? diffY : 0);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (isClosing) return;
    if (dragDistance > swipeThreshold) {
      handleClose();
    } else {
      // Snap back
      setDragDistance(0);
    }
  };

  const basketStyle = {
    transform: `translateY(${dragDistance}px)`,
    transition: isDragging ? 'none' : 'transform 0.4s ease'
  };

  return (
    <>
      <div
        className={`backdrop ${isBackdropVisible ? "visible" : "hidden"}`}
        onClick={!isClosing ? handleClose : undefined}
      ></div>
      <section ref={basketRef}
        className={`basket-container ${isAnimating ? "slide-in" : "slide-out"}`}
        style={basketStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <BasketNav onClose={handleClose} />
        <div className="basket-content">
        <div className="list-view basket-items-container">
          {items.length > 0 ? (
            <div className="items-in-basket-view">
              <div className="list-view-section">
                {items.map((item, index) => (
                  <div key={index} className="menu-section">
                    <BasketItem
                      key={item.title[0].text}
                      item={item}
                      onRemove={onRemove}
                      goToIndex={goToIndex}
                      index={index}
                    />
                  </div>
                ))}
              </div>
              <div className="footer-section">
                <LineBreak />
                <FooterCopy />
              </div>
            </div>
          ) : (
            <BasketEmpty />
          )}
        </div>
        <CreatedBy />
        </div>
      </section>
    </>
  );
};

export default Basket;