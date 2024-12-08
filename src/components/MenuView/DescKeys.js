import React from "react";
import { ReactComponent as Vegan } from "../img/Vegan.svg";

const DescKeys = ({ item }) => {
  return (
    <div className="item-description-keys">
      {item.kcal && (
        <div className="kca lv-pill ">
          <span>
            <i>{item.kcal}</i>
          </span>
          <span>kcal</span>
        </div>
      )}
      {item.gluten_free && (
        <span className="gluten-free noselect">
          <strong>GF</strong>
        </span>
      )}
      {item.vegan && (
        <span className="vegan noselect">
          <Vegan />
          Vegan
        </span>
      )}
      {item.veg_option_avalaible && (
        <span className="vegan noselect">
          <strong> GFA</strong>
        </span>
      )}
    </div>
  );
};

export default DescKeys;
