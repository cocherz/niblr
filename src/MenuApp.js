import React, { useState, useEffect } from "react";
import Menu from "./components/MenuView/MenuCatagoryView";
import Basket from "./components/Basket/Basket";
import { useSinglePrismicDocument } from "@prismicio/react";
import TopNavbar from "./components/MenuView/NavBars/MenuTopNavbar";
import ListView from "./components/ListView/ListView";
import usePinchGesture from "./hooks/pinchChecking";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import "./index.css";
import useBasket from "./hooks/useBasket";

const MenuApp = ({ currentConfig }) => {
  // State Management
  const [menuViewState, setMenuViewState] = useState(true);
  const [basketVisible, setBasketVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollToListViewIndex, setScrollToListViewIndex] = useState(0);
  const [scrollToItemIndex, setScrollToItemIndex] = useState(0);
  const [menu, menuState] = useSinglePrismicDocument(currentConfig.prismicDocument);

  const { likedItems, basketItems, toggleItemInBasket, removeFromBasket } = useBasket();
  const notFound = menuState.state === "failed";

  // Handlers
  const showBasket = () => {
    setBasketVisible(true);
    setIsAnimating(true);
  };

  const hideBasket = () => {
    setIsAnimating(false); // Trigger the animation out
    setTimeout(() => {
      setBasketVisible(false); // Remove from DOM after animation
    }, 400); // Match the animation duration in CSS
  };

  const toggleMenuView = () => setMenuViewState((prev) => !prev);

  // Handle Pinch Gesture
  usePinchGesture(toggleMenuView);

  // Handle Loading State Transitions
  useEffect(() => {
    if (isLoading && (menuState.state === "loaded" || menuState.state === "failed")) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setMenuViewState(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, menuState.state]);

  // Main Render
  if (menu) {
    return (
      <>
        {isLoading && <LoadingScreen />}
        <div className="spacer zero-z"></div>
        <TopNavbar
          menu={menu.data.body}
          activeIndex={activeIndex}
          onBasketClick={showBasket}
          menuSwapView={toggleMenuView}
          setScrollToListViewIndex={setScrollToListViewIndex}
          onClose={() => setMenuViewState(false)}
          pageView={menuViewState ? "list" : "item"}
        />

        {/* Render Menu */}
        <section style={{ position: "relative", zIndex: 0 }}>
          {menuViewState ? (
            <ListView
              menu={menu.data.body}
              onClose={() => setMenuViewState(false)}
              onChange={setActiveIndex}
              setScrollToItemIndex={setScrollToItemIndex}
              scrollToListViewIndex={scrollToListViewIndex}
            />
          ) : (
            <Menu
              likedItems={likedItems}
              menu={menu.data.body}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
              toggleItemInBasket={toggleItemInBasket}
              scrollToItemIndex={scrollToItemIndex}
              setScrollToItemIndex={setScrollToItemIndex}
            />
          )}
        </section>

        {/* Render Basket as Overlay */}
        <div
          className={`basket-overlay ${basketVisible ? "visible" : "hidden"}`}
          style={{ position: "absolute", top: 0, zIndex: 10 }}
        >
          <Basket
            items={basketItems}
            onClose={hideBasket}
            onRemove={removeFromBasket}
            onChange={setActiveIndex}
            setScrollToItemIndex={setScrollToItemIndex}
            isAnimating={isAnimating}
          />
        </div>
       
      </>
    );
  }

  if (notFound) {
    console.error("Response not found :(");
    return null;
  }

  return null;
};

export default MenuApp;