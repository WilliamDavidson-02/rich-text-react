import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getWindowSize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", getWindowSize);

    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

  return windowWidth;
};
