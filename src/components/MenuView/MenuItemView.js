import React, { useState, useRef, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ItemDescription from "./ItemDescription";
import ImageView from "./ImageView";
import useScreenHeight from "../../hooks/useScreenHeight";
import VideoPlayer from "./VideoPlayer";

const MenuItem = ({
  toggleItemInBasket,
  likedItems,
  current_menu,
  scrollToItemIndex,
  index,
  isActive,
  setScrollToItemIndex
}) => {
  const availableItems = current_menu.items.filter((item) => item.is_item_available);
  const screenHeight = useScreenHeight();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const menuIndex = index;
  const playerRefs = useRef([]);
  const swiperItemRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setCurrentItemIndex(swiper.activeIndex);
  };

  const swiperSettings = {
    direction: "vertical",
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: {
      clickable: true,
    },
    onSlideChange: handleSlideChange,
    initialSlide: scrollToItemIndex || 0,
    speed: 400,
  };


  useEffect(() => {
    if (swiperItemRef.current && swiperItemRef.current.swiper && scrollToItemIndex != null) {
      swiperItemRef.current.swiper.slideTo(scrollToItemIndex);
      setScrollToItemIndex(null)
    }
  }, [scrollToItemIndex]);



  const verticalSwiperStyle = {
    height: `${screenHeight}px`,
    width: "100vw",
    overflow: "hidden",
  };

  return (
    <Swiper  ref={swiperItemRef} className="menu-item-slider" direction={"vertical"} {...swiperSettings} style={verticalSwiperStyle}>
      {availableItems.map((item, index) => (
        <SwiperSlide key={index}>
          {item.item_video.url ? (
            <VideoPlayer
              playerRefs={playerRefs}
              isActive={isActive}
              currentItemIndex={currentItemIndex}
              index={index}
              item={item}
            />
          ) : (
            <ImageView src={item.content_image.url} />
          )}
          <ItemDescription
            menuIndex={menuIndex}
            itemIndex={currentItemIndex}
            likedItems={likedItems}
            currentMenu={current_menu}
            item={item}
            index={index}
            categoryName={current_menu.primary.section_title[0].text}
            toggleItemInBasket={toggleItemInBasket}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MenuItem;