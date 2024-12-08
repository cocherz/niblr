
import React , {useEffect, useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore  from 'swiper';
import { Navigation, Pagination,  } from 'swiper/modules';
// import 'swiper/css';



let swiperInstance = null;

const onSwiper = (swiper) => {
  swiperInstance = swiper;
}



SwiperCore.use([Pagination, Navigation]);


export const BottomNavBar = ({ menu, activeIndex, onChange }) => {
  const categories = menu.map(entry => entry.primary.section_title[0].text);
  const icon = menu.map(entry => entry.primary.icon.url);
  const footerRef = useRef(null); // Use ref to refer to the footer DOM element
  



  useEffect(() => {
    const footer = footerRef.current; // Get the current element of the ref
  
    const handleTouchStart = (e) => {
      const touchStartY = e.touches[0].pageY;
      const touchStartX = e.touches[0].pageX;
  
      const handleTouchMove = (e) => {
        const touchEndY = e.changedTouches[0].pageY;
        const touchEndX = e.changedTouches[0].pageX;
  
        if (Math.abs(touchEndX - touchStartX) < Math.abs(touchEndY - touchStartY) && touchEndY > touchStartY) {
          e.preventDefault();
        }
      };
  
      e.currentTarget.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      const cleanupTouchMove = () => {
        if (e.currentTarget) {
          e.currentTarget.removeEventListener('touchmove', handleTouchMove);
        }
      };
      
      e.currentTarget.addEventListener('touchend', cleanupTouchMove);
      e.currentTarget.addEventListener('touchcancel', cleanupTouchMove);
    };
  
    if (footer) {
      footer.addEventListener('touchstart', handleTouchStart, { passive: false });
    }
  
    return () => {
      if (footer) {
        footer.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, []);



  const swiperSettings = {
    touchStartForcePreventDefault: false,
    cssMode: false, 
    direction: 'horizontal',
    speed: 700,
    slidesPerView: 5,
    spaceBetween: 0,
    navigation: true,
    initialSlide: activeIndex,
    // dragClass: 'swiper-drag',
    scrollbar: { 
    },    
    centeredSlides: true,
  };
  

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(activeIndex);
    }
  }, [activeIndex]);



  return (
    <div className="bottom-navbar fixed-footer noselect" ref={footerRef}>
      <Swiper {...swiperSettings} className="" onSwiper={onSwiper} >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <button 
                className={index === activeIndex ? "button-base active-button" : "button-base"}
                onClick={() => {onChange(index)}}>
              <img className={index === activeIndex ? "active-svg-image" : "svg-image"} src={icon[index]} alt=""/>
              <div className={`underline ${index === activeIndex ? "active-underline" : ""}`}></div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default BottomNavBar;