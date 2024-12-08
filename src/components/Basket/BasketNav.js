
import React from 'react';
import { ReactComponent as Close } from '../img/Close.svg';

const BasketNav = ({ onClose }) => (
  <nav className="sticky navigation-bar noselect">
    <div className="navigationButtonSpace">
      <Close onClick={onClose}/>
    </div>
    <div className="title-container">
      <h2 className="categorie-title">Basket</h2>
    </div>
  <div className="navigationButtonSpace"></div>
  </nav>
)

export default BasketNav;