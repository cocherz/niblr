import React from "react";
import { ReactComponent as Cheveron } from "./Cheveron.svg";
import { ReactComponent as Vegan } from "../../img/Vegan.svg";

const ListVeiwItem = ({ item, showPriceAndChevron }) => {
  return (
    <div className="lv-item-content-container">
      <div className="lv-item-copy">
        <div className="lv-item-title-copy">
          <p className="lv-item-title">{item.title[0].text}</p>
          {item.price && showPriceAndChevron && (
          <div className="price-text">
            <i>£{item.price}</i>
          </div>
        )}
        </div>
        <div className="itemDescription">
          <p>{item.item_text[0].text}</p>
        </div>
        <div className="icons-flex-between">
        <div className="lv-item-botton-line-info">
          {item.kcal && (
            <div className="kca lv-pill">
              <span>
                <i>{item.kcal}</i>
              </span>
              <span>kcal</span>
            </div>
          )}
          {item.gluten_free && (
            <span className="lv-pill gluten-free">
              <strong>GF</strong>
            </span>
          )}
          {item.vegan && (
            <span className="lv-pill vegan">
              <Vegan />
              Vegan
            </span>
          )}
          
          {item.veg_option_avalaible && (
            <span className="lv-pill gluten-free">
              <strong>VGA</strong>
            </span>
          )}
          </div>
          <div className="cheveron">
          {showPriceAndChevron && (
          <div className="lv-more-cta">
            <Cheveron />
          </div>
        )}
        </div>
        </div>
      </div>
     
    </div>
  );
};
export default ListVeiwItem;
