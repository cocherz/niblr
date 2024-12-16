
import React from 'react';
import { ReactComponent as Close } from '../img/Close.svg';

const BasketNav = ({ onClose }) => (
  <nav className="sticky basket-header navigation-bar noselect">
    <div className="navigationButtonSpace" onClick={onClose}>
      <Close />
    </div>
    <div className="title-container">
      <h2 className="categorie-title">Basket</h2>
    </div>
  <div className="navigationButtonSpace"></div>
  </nav>
)

export default BasketNav;