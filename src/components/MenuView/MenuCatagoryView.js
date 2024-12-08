import MenuItem from "./MenuItemView";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BottomNavBar from "./NavBars/BottomNavBar";

import "swiper/css";
export const Menu = ({ likedItems, menu, activeIndex, onChange, toggleItemInBasket, scrollToItemIndex, setScrollToItemIndex }) => {
  const swiperRef = useRef(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(activeIndex);

  const swiperSettings = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    onSlideChange: (swiper) => {
      onChange(swiper.activeIndex);
      setActiveMenuIndex(swiper.activeIndex); // Update the active menu index on slide change
    },
    initialSlide: activeIndex,
    direction: "horizontal",
    cssMode: false,
  };

  const updateActiveIndex = (newIndex) => {
    swiperRef.current.swiper.slideTo(newIndex);
  };

  return (
    <div className="container-class noselect">
      <Swiper ref={swiperRef} {...swiperSettings}>
        {Object.keys(menu).map((category, index) => (
          <SwiperSlide key={index}>
            <MenuItem
              scrollToItemIndex={index === activeMenuIndex ? scrollToItemIndex : null} // Only send scrollToItemIndex for the active index
              setScrollToItemIndex={setScrollToItemIndex}
              current_menu={menu[index]}
              index={index}
              isActive={activeMenuIndex === index} // Pass down isActive as a prop
              activeMenuIndex={activeMenuIndex}
              current_menu_activeIndex={menu[index]}
              category={category}
              toggleItemInBasket={toggleItemInBasket}
              likedItems={likedItems}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <BottomNavBar menu={menu} activeIndex={activeIndex} onChange={updateActiveIndex} />
    </div>
  );
};

export default Menu;
