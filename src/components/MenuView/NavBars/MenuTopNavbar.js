import React from "react";
import config from "../../../Config";
import mixpanel from "mixpanel-browser";
import { ReactComponent as Basket } from "./Basket.svg";
import { ReactComponent as ListViewICON } from "../../img/ListView.svg";
import { ReactComponent as Close } from "../../img/Close.svg";
import MenuViewTitle from "./menuViewTitle";

export const Navbar = ({ menu, onClose, itemView, activeIndex, onBasketClick, menuSwapView, setScrollToListViewIndex, pageView }) => {

  
  const handleViewToggleClick = () => {
    setScrollToListViewIndex(activeIndex);
    mixpanel.track("List view opened");
    menuSwapView();
  };  

  return (
    <>
      <nav className="navigation-bar noselect">
        {pageView === "item" ? (
          <button className="navigationButton navigationButtonSpace " onClick={handleViewToggleClick}>
            <ListViewICON  className="svg_image" />
          </button>
        ) : (
          <button className="navigationButton navigationButtonSpace" onClick={onClose}>
            <Close />
          </button>
        )}
        <div className="title-container"> 
        {pageView === "item" ?
         <MenuViewTitle menu={menu} handleViewToggleClick={handleViewToggleClick} activeIndex={activeIndex} /> : null}
        {pageView === "basket" ? <h2 className="categorie-title">Basket</h2> : null}
        </div>

        <div className="navigationButtonSpace">
        {config.featureBasket && pageView === "item"  && 
        (
          <button className="navigationButton" onClick={onBasketClick}>
            <Basket className="svg_image" />
          </button>
        )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
