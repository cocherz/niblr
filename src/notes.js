import React, { useState, useEffect, useRef } from "react";
import { PrismicProvider } from "@prismicio/react";
import Menu from "./components/MenuView/MenuCatagoryView";
import Basket from "./components/Basket/Basket";
import { client } from "./prismic";
import { useSinglePrismicDocument } from "@prismicio/react";
import TopNavbar from "./components/MenuView/NavBars/MenuTopNavbar";
import ListView from "./components/ListView/ListView";
import usePinchGesture from "./hooks/pinchChecking";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import './index.css';


export const MenuApp = ( {subdomain, currentConfig }) => {
  const [menuViewVisible, setMenuViewVisible] = useState(true);
  const [menuViewState, setMenuViewState] = useState(false);
  const [basketVisible, setBasketVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  
    const [activeIndex, setActiveIndex] = useState(0);
    const [basketItems, setBasketItems] = useState([]);
    const [likedItems, setLikedItems] = useState(new Set());
    const sliderRef = useRef(null);
    const [scrollToItemIndex, setScrollToItemIndex] = useState(null);
    const [menu, menuState] = useSinglePrismicDocument(currentConfig.prismicDocument);
    const notFound = menuState.state === "failed";




    const toggleItemInBasket = (item, itemIndex, menuIndex) => {
        setBasketItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex((basketItem) => basketItem.content_image.url === item.content_image.url);
    
          if (existingItemIndex !== -1) {
            setLikedItems((prevLiked) => {
              const newLiked = new Set(prevLiked);
              newLiked.delete(item.content_image.url);
              return newLiked;
            });
            return prevItems.filter((_, index) => index !== existingItemIndex);
          } else {
            setLikedItems((prevLiked) => new Set(prevLiked).add(item.content_image.url));
            const newItem = {
              ...item,
              itemIndex: itemIndex,
              menuIndex: menuIndex,
            };
    
            return [...prevItems, newItem];
          }
        });
      };
    
      const removeFromBasket = (indexToRemove) => {
        setBasketItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
    
        // Assuming each item has a unique content_image.url that's used for tracking likes
        const removedItemUrl = basketItems[indexToRemove]?.content_image.url;
        if (removedItemUrl) {
          setLikedItems((prevLiked) => {
            const updatedLiked = new Set(prevLiked);
            updatedLiked.delete(removedItemUrl);
            return updatedLiked;
          });
        }
      };
    
      const toggleBasketVisibility = () => {
        setBasketVisible((prevVisibility) => !prevVisibility);
        // setMenuViewVisible((prevVisibility) => !prevVisibility);
      };
      const toggleMenuView = () => {
        setMenuViewState((prevVisibility) => !prevVisibility);
      };
      usePinchGesture(toggleMenuView);
    
      useEffect(() => {
        if (menuViewState) {
          setMenuViewVisible(true); // Show the menu immediately
        } else {
          // Start the fade-out effect and wait 300ms to unmount
          const timer = setTimeout(() => setMenuViewVisible(false), 150);
          return () => clearTimeout(timer); // Clean up the timer
        }
      }, [menuViewState]);
    
      // useEffect(() => {
      //   if (menuState.state === "loaded" || menuState.state === "failed") {
      //     const timer = setTimeout(() => {
      //       setIsLoading(false);
      //       setMenuViewState(true);
      //     }, 4000);
    
      //     return () => clearTimeout(timer);
      //   }
      // }, [menuState.state]);



      if (menu) {
        return (
          <PrismicProvider client={client}>
            {isLoading && <LoadingScreen />}
            <div className={`listview-component ${basketVisible ? "visible" : "hidden"}`}>
              {basketVisible && (
                <Basket
                  className="basket-component"
                  items={basketItems}
                  icons={menu.data.icons}
                  onClose={toggleBasketVisibility}
                  onRemove={removeFromBasket}
                  onChange={setActiveIndex}
                  setScrollToItemIndex={setScrollToItemIndex}
                  toggleItemInBasket={toggleItemInBasket}
                  basketItems={basketItems}
                />
              )}
            </div>
            <div className={`listview-component ${menuViewVisible ? "visible" : "hidden"} noselect`}>
              {menuViewState && (
                <ListView
                  menu={menu.data.body}
                  onClose={() => setMenuViewState(false)}
                  activeIndex={activeIndex}
                  onChange={setActiveIndex}
                  setScrollToItemIndex={setScrollToItemIndex}
                  icons={menu.data.icons}
                />
              )}
            </div>
            {!menuViewState && !basketVisible && (
              <section className={`menu-component ${menuViewVisible ? "hidden" : "visible"}`}>
                <TopNavbar menu={menu.data.body} icons={menu.data.icons} activeIndex={activeIndex} onChange={setActiveIndex} onBasketClick={toggleBasketVisibility} menuSwapView={toggleMenuView} />
                <Menu
                  menu={menu.data.body}
                  icons={menu.data.icons}
                  sliderRef={sliderRef}
                  basketItems={basketItems}
                  activeIndex={activeIndex}
                  onChange={setActiveIndex}
                  onItemChange={setScrollToItemIndex}
                  toggleItemInBasket={toggleItemInBasket}
                  likedItems={likedItems}
                  scrollToItemIndex={scrollToItemIndex}
                />
              </section>
            )}
          </PrismicProvider>
        );
      } else if (notFound) {
        return console.log("response notfound :( ");
      }
      return null;
    }

export default MenuApp;