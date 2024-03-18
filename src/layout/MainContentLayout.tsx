import React, { ReactChildren, ReactChild, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { MainContentLoginLayout } from "../components/index";

import "./mainContanier.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContentViewLayout } from "./mainLayout/MainContentViewLayout";
import { useAuthContext } from "../hooks/useAuthContext";
import { isEmpty } from "lodash";
import { getTokenInLocal } from "../utils/cacheStorage";
import { useDispatchApp } from "../store/Store";
import { getUserDetails } from "../store/action/auth";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

interface childProps {
  children: ReactChild | ReactChildren;
}
const publicRoutes = [
  "/auth",
  "/password-reset",
  "/password-forgot",
  "/unauthorized",
];

export const MainContentLayout = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate()
  var currentPath = location.pathname;
  let { token,userDetails } = useSelector((state: RootState) => state.auth);
  
  const dispatch = useDispatchApp()

  //load user details
  useEffect(()=>{
    if(!isEmpty(getTokenInLocal()) ){
      dispatch(getUserDetails())
  }else{
    navigate("/auth")
  }
  },[token])


  return (
    <MainContentViewLayout currentPath={currentPath} children={children} />
  );
};
