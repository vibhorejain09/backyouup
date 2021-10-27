import { useState, useLayoutEffect } from "react";

export default function useWindowHeight() {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    function updateHeight() {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return height;
}
