import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import { initializeApp } from "firebase/app";

import ProtectRoute from "./protectRoute";
import { MainRoutes } from "./routes";
import { AuthContextProvider } from "./context/AuthContext";

import "./index.scss";
import "semantic-ui-css/semantic.min.css";
import { MainContentLayout } from "./components";
import { useThemeContext } from "./hooks/useThemeContext";
import { THEME } from "./config/constants";
import { store } from "./store/Store";
import { firebaseConfig } from "./config/fireabse";
import { getUserDetails } from "./store/action/auth";

const App: React.FC = () => {
  const { dispatch } = useThemeContext();
  initializeApp(firebaseConfig);
  useEffect(() => {
    dispatch({ type: THEME });
    store.dispatch({
      type: "AUTH_TOKEN",
      payload: localStorage.getItem("token"),
    });
  }, []);

  return (
    <div className="app">
      <AuthContextProvider>
          <BrowserRouter>
            <MainContentLayout>
              <Routes>
                {MainRoutes.map((routesDetails, index) => (
                  <Route path={routesDetails.mainPath} key={index} element={<Outlet />}>
                    {routesDetails.routes.map((subRoutes, index) => (
                      <Route
                        key={index}
                        path={subRoutes.path}
                        element={
                          <ProtectRoute
                            redirectTo="/auth"
                            protectRoutes={subRoutes.protectRoutes}
                          >
                            {subRoutes.route}
                          </ProtectRoute>
                        }
                      />
                    ))}
                  </Route>
                ))}
              </Routes>
            </MainContentLayout>
          </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
