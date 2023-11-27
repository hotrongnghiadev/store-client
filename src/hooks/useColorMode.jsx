import React from "react";
import useLocalStorage from "./useLocalStorage";

// with tailwind only add class "dark" to body
const useColorMode = () => {
  const [color, setColor] = useLocalStorage("colorMode", "light");
  React.useEffect(() => {
    const bodyClass = window.document.body.classList;
    // follow tailwind
    if (color === "dark") {
      bodyClass.add("dark");
    } else bodyClass.remove("dark");
  }, [color]);
  return [color, setColor];
};

export default useColorMode;
