import { useEffect } from "react";

const usePinchGesture = (onPinchIn) => {
  useEffect(() => {
    let initialDistance = null;

    const getDistance = (touches) => {
      const touch1 = touches[0];
      const touch2 = touches[1];
      return Math.hypot(
        touch1.pageX - touch2.pageX,
        touch1.pageY - touch2.pageY
      );
    };

    const onTouchStart = (event) => {
      if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches);
        event.preventDefault(); // Prevent default behavior on touch start with two fingers
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 2 && initialDistance != null) {
        const distance = getDistance(event.touches);
        if (distance < initialDistance) {
          // User is pinching in
          onPinchIn(distance / initialDistance); // Call the onPinchIn callback with the scale
        } else {
          // User is pinching out
          event.preventDefault(); // Prevent default behavior like zooming
        }
      }
    };

    const onTouchEnd = () => {
      initialDistance = null;
    };

    // Add passive: false to the options to allow preventDefault
    document.addEventListener("touchstart", onTouchStart, { passive: false });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [onPinchIn]); // Re-bind if the callback changes
};

export default usePinchGesture;