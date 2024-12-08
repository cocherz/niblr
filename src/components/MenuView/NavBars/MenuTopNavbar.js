import React from "react";
import config from "../../../Config";
import mixpanel from "mixpanel-browser";
import { ReactComponent as Basket } from "./Basket.svg";
import { ReactComponent as ListViewICON } from "../../img/ListView.svg";
import MenuViewTitle from "./menuViewTitle";

export const Navbar = ({ menu, onClose, itemView, activeIndex, onBasketClick, menuSwapView, setScrollToListViewIndex, pageView }) => {
  const handleViewToggleClick = () => {
    setScrollToListViewIndex(activeIndex);
    mixpanel.track("List view opened");
    menuSwapView();
  };

  return (
    <>
      {pageView === "item" ? (
        <nav className="z-index-top navigation-bar noselect">
          <button className="navigationButton navigationButtonSpace " onClick={handleViewToggleClick}>
            <ListViewICON className="svg_image" />
          </button>
          <div className="title-container">
            <MenuViewTitle className="z-index-top" menu={menu} handleViewToggleClick={handleViewToggleClick} activeIndex={activeIndex} />
          </div>
          <div className="navigationButtonSpace">
            {config.featureBasket && (
              <button className="navigationButton" onClick={onBasketClick}>
                <Basket className="svg_image" />
              </button>
            )}
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
