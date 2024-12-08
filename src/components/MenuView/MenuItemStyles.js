import useScreenHeight from "../../hooks/useScreenHeight";

const MenuItemStyles = () => {

  const screenHeight = useScreenHeight();

  const dynamicStyles = {
    container: {
      height: `${screenHeight}px`,
      zIndex: "0",
      width: '100vw', 
    },
    item: {
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      scrollSnapAlign: "start",
      height: `${screenHeight}px`,
      position: "relative",
    },
  };

  // const containerStyles = {
  //   position: "relative",
  //   zIndex: "0",
  //   height: `${screenHeight}px`,
  //   overflow: "hidden",
  //   width: '100vw', 
  //   userSelect: "none",
  //   WebkitUserSelect: "none",
  //   MozUserSelect: "none",
  //   msUserSelect: "none",
  // };

  return { dynamicStyles, 
    // containerStyles
   };
}

export default MenuItemStyles;