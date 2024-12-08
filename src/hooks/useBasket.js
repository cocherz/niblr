import { useCallback, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library

function useBasket(initialItems = []) {
  // Initialize basketItems and likedItems from cookies if they exist, otherwise use initialItems
  const [basketItems, setBasketItems] = useState(() => {
    const savedBasket = Cookies.get('basketItems');
    return savedBasket ? JSON.parse(savedBasket) : initialItems;
  });

  const [likedItems, setLikedItems] = useState(() => {
    const savedLiked = Cookies.get('likedItems');
    return savedLiked ? new Set(JSON.parse(savedLiked)) : new Set();
  });

  // Save basketItems to cookies whenever they change
  useEffect(() => {
    Cookies.set('basketItems', JSON.stringify(basketItems), { expires: 7 }); // Cookie expires in 7 days
  }, [basketItems]);

  // Save likedItems to cookies whenever they change
  useEffect(() => {
    Cookies.set('likedItems', JSON.stringify(Array.from(likedItems)), { expires: 7 }); // Cookie expires in 7 days
  }, [likedItems]);

  const toggleItemInBasket = useCallback((item, itemIndex, menuIndex) => {
    setBasketItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (basketItem) => basketItem.content_image.url === item.content_image.url
      );
      if (existingItemIndex !== -1) {
        // If the item exists, remove it from both basketItems and likedItems
        return prevItems.filter((_, index) => index !== existingItemIndex);
      } else {
        // If the item does not exist, add it to basketItems
        const newItem = {
          ...item,
          itemIndex: itemIndex,
          menuIndex: menuIndex,
        };
        return [...prevItems, newItem];
      }
    });

    setLikedItems((prevLiked) => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(item.content_image.url)) {
        newLiked.delete(item.content_image.url);
      } else {
        newLiked.add(item.content_image.url);
      }
      return newLiked;
    });
  }, []);

  const removeFromBasket = useCallback(
    (indexToRemove) => {
      setBasketItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
      // Optimisation: Calculate removedItemUrl before setting state to avoid dependency on basketItems state
      const removedItemUrl = basketItems[indexToRemove]?.content_image.url;
      if (removedItemUrl) {
        setLikedItems((prevLiked) => {
          const updatedLiked = new Set(prevLiked);
          updatedLiked.delete(removedItemUrl);
          return updatedLiked;
        });
      }
    },
    [basketItems]
  );

  return {
    basketItems,
    toggleItemInBasket,
    removeFromBasket,
    likedItems,
  };
}

export default useBasket;