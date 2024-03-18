import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { store } from "./store/Store";
import "./fonts/proxima/Proxima-Nova.ttf";

import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeContextProvider>
);
