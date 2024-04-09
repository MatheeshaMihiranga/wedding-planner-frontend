import React, { useEffect } from "react";

import "./mainContanier.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContentViewLayout } from "./mainLayout/MainContentViewLayout";
import { useDispatchApp } from "../store/Store";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { getUserDetails } from "../store/action/auth";

export const MainContentLayout = ({ children }: any) => {
  const location = useLocation();

  var currentPath = location.pathname;
  let { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatchApp();

  //load user details
  useEffect(() => {
    dispatch(getUserDetails());
  }, [token]);

  return (
    <MainContentViewLayout currentPath={currentPath} children={children} />
  );
};
