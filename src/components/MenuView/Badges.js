import React from 'react'

const Badges = ( config, item ) => {
    return (
        <div> 
        {config.featureOOSandRecommended && (
            <div className="pills-container">
              {item.out_of_stock_flag ? (
                <div className="pill out-of-stock-pill">
                  <span>Out of stock</span>
                </div>
              ) : item.recommended_flag ? (
                <div className="pill recommended-pill">
                  <span>Recommended</span>
                </div>
              ) : null}
            </div>
          )}
          </div>
    )
}

export default Badges