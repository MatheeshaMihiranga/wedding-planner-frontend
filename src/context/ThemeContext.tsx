import { createContext, useReducer } from "react";
import defaultTheme from '../themes/blueTheme'

export const ThemeContext = createContext<any>(defaultTheme);

  //define theme values
  const setCSSVariables = (theme:any) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  };

const themes = {
  default:defaultTheme,
};

export const themeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "BLUE":
      setCSSVariables(themes.default);
      return { theme: themes.default };
    default:
      setCSSVariables(state)
      return state
  }
};

export const ThemeContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: themes.default,
  });

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
