import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setIsAnimating(true); // Start the animation when the component is mounted
  }, []);

  const handleClose = () => {
    setIsAnimating(false); // Trigger the slide-out animation
    setTimeout(() => {
      closeBasket(); // Call the parent function to unmount the component after animation
    }, 400); // Match the transition duration
  };

 const goToIndex = (menuIndex, itemIndex) => {
    console.log(menuIndex, itemIndex);
    
    setActiveIndex(menuIndex);
    setScrollToItemIndex(itemIndex);
    handleClose()
  }

  return (
    <>
      <div
        className={`backdrop ${isBackdropVisible ? "visible" : "hidden"}`}
        onClick={handleClose}
      ></div>
      <section
        className={`basket-container ${
          isAnimating ? "slide-in" : "slide-out"
        }`}
      >
        <BasketNav onClose={handleClose} />
        <div className="list-view">
          {items.length > 0 ? (
            <div className="items-in-basket-view">
              <div className="list-view-section">
                {items.map((item, index) => (
                  <div key={index} className="menu-section">
                    <BasketItem
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
      </section>
    </>
  );
};

export default Basket;