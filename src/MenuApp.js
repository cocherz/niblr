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
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);


  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollToListViewIndex, setScrollToListViewIndex] = useState(0);
  const [scrollToItemIndex, setScrollToItemIndex] = useState(0);
  const [menu, menuState] = useSinglePrismicDocument(currentConfig.prismicDocument);

  const { likedItems, basketItems, toggleItemInBasket, removeFromBasket } = useBasket();
  const notFound = menuState.state === "failed";

  // Handlers
  const toggleBasket = () => {
    if (!basketVisible) {
      setIsBackdropVisible(true); // Show backdrop
    } else {
      setIsBackdropVisible(false); // Hide backdrop
    }
    setBasketVisible(!basketVisible);
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
          onBasketClick={toggleBasket}
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
              activeIndex={activeIndex}
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

        {basketVisible && (
          <Basket
            items={basketItems}
            onRemove={removeFromBasket}
            setActiveIndex={setActiveIndex}
            setScrollToItemIndex={setScrollToItemIndex}
            closeBasket={toggleBasket}
            isBackdropVisible={isBackdropVisible} // Pass down the visibility
          />
        )}
       
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