import React from 'react'


const MenuViewTitle = ({ menu, handleViewToggleClick, activeIndex}) => {
    const categories = menu.map((entry) => entry.primary.section_title[0].text);
    return (
        <div className="title-container noselect">
          {categories.map((category, index) => {
            if (index === activeIndex) {
              return (
                <h2 className="categorie-title" 
                key={index} 
                onClick={handleViewToggleClick}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
              );
            }
            return null;
          })}
        </div>
    )
}

export default MenuViewTitle