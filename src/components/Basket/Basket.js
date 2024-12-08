import React from "react";
import BasketItem from "./BasketItem";
import FooterCopy from "../ListView/components/FooterCopy";
import LineBreak from "../ListView/components/LineBreak";
import CreatedBy from "../LoadingScreen/Components/CreatedBy";
import { ReactComponent as Close } from "../img/Close.svg";

const Basket = ({ items = [], onClose, onRemove, onChange, setScrollToItemIndex, isAnimating }) => {
  const goToIndex = (menuIndex, itemIndex) => {
    onClose();
    onChange(menuIndex);
    setScrollToItemIndex(itemIndex);
  };

  return (
    <section> 
     <div className="basket-spacer"> </div> 
    <div className={`basket-overlay ${isAnimating ? "animate-in" : "animate-out"}`}>
      <div className="basket-container">
        <nav className="navigation-bar noselect">
          <button className="navigationButton navigationButtonSpace" >
          </button>
          <div className="title-container">
            <h2 className="categorie-title">Basket</h2>
          </div>
          <div className="navigationButtonSpace">
            <Close onClick={onClose}/>
          </div>
        </nav>
        <div className="content-wrapper non-scrollable">
          <div className="list-view">
            <div className="top-padding-70" />
            {items.length > 0 ? (
              <div className="items-in-basket-view">
                <div className="list-view-section">
                  {items.map((item, index) => (
                    <div key={index} className="menu-section">
                      <BasketItem item={item} onRemove={onRemove} goToIndex={goToIndex} index={index} />
                    </div>
                  ))}
                </div>
                <div className="footer-section">
                  <LineBreak />
                  <FooterCopy />
                </div>
              </div>
            ) : (
              <div className="empty-basket-view">
                <LineBreak />
                <p className="empty-basket-copy">
                  Save items to your basket using the heart button
                </p>
              </div>
            )}
          </div>
        </div>        
        <CreatedBy />
      </div>
    </div>
    </section>
  );
};

export default Basket;