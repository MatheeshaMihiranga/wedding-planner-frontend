import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error("ThemeContext must be used inside an ThemeContextProvider");
  }

  return context;
};
