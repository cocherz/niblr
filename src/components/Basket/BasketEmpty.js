import React from 'react';
import LineBreak from '../ListView/components/LineBreak';

const BasketEmpty = () => {
    return (
        <div className="empty-basket-view">
            <LineBreak />
            <p className="empty-basket-copy">
                Save items to your basket using the heart button
            </p>
        </div>
    )
}

export default BasketEmpty;