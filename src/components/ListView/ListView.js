import React, { useEffect, useRef } from "react";
import mixpanel from "mixpanel-browser";
import ListViewImage from "./components/ListViewImage";
import SectionHeader from "./components/SectionHeader";
import ListViewItem from "./components/ListViewItem";
import FooterCopy from "./components/FooterCopy";
import LineBreak from "./components/LineBreak";
import CreatedBy from "../LoadingScreen/Components/CreatedBy";

const ListView = ({
  menu,
  onClose,
  onChange,
  setScrollToItemIndex,
  scrollToListViewIndex = 3,
}) => {
  const categoryRefs = useRef([]);
  const listViewRef = useRef(null);

  // Scroll to specific category on mount or when index changes
  useEffect(() => {
    const targetRef = categoryRefs.current[scrollToListViewIndex];
    if (targetRef) {
      targetRef.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [scrollToListViewIndex]);

  // Track item views and trigger callbacks
  const handleItemClick = (catIndex, itemIndex) => {
    const category = menu[catIndex];
    const item = category.items[itemIndex];

    mixpanel.track("Item View", {
      Item: item.title[0].text,
      Category: category.primary.section_title[0].text,
    });

    onClose();
    onChange(catIndex);
    setScrollToItemIndex(itemIndex);
  };

  // Prevent pinch and gesture zoom on mobile devices
  const preventZoomAndGestures = (e) => {
    if (e.touches?.length > 1 || e.type.startsWith("gesture")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const eventOptions = { passive: false };

    // Add event listeners
    document.addEventListener("touchstart", preventZoomAndGestures, eventOptions);
    document.addEventListener("touchmove", preventZoomAndGestures, eventOptions);
    document.addEventListener("gesturestart", preventZoomAndGestures, eventOptions);
    document.addEventListener("gesturechange", preventZoomAndGestures, eventOptions);
    document.addEventListener("gestureend", preventZoomAndGestures, eventOptions);

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener("touchstart", preventZoomAndGestures);
      document.removeEventListener("touchmove", preventZoomAndGestures);
      document.removeEventListener("gesturestart", preventZoomAndGestures);
      document.removeEventListener("gesturechange", preventZoomAndGestures);
      document.removeEventListener("gestureend", preventZoomAndGestures);
    };
  }, []);

  return (
    <section className="list-view-component-container">
      <div className="list-view noselect" ref={listViewRef}>
        {menu.map((category, catIndex) => (
          <div
            key={catIndex}
            ref={(el) => (categoryRefs.current[catIndex] = el)}
            className="list-view-section"
          >
            <SectionHeader
              icon={category.primary.icon}
              sectionTitle={category.primary.section_title[0].text}
            />
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="option-container">
                <div
                  className="option"
                  onClick={() => handleItemClick(catIndex, itemIndex)}
                >
                  <ListViewImage src={item.content_image.url} />
                  <ListViewItem item={item} showPriceAndChevron={true} />
                </div>
              </div>
            ))}
            <LineBreak />
          </div>
        ))}
        <div className="spacer-300" />
        <FooterCopy className="noselect" />
        <CreatedBy />
      </div>
    </section>
  );
};

export default ListView;