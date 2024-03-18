import { Dispatch } from "redux";
import _ from "lodash";

import { AUTH_TOKEN, LOADING, RESET_DATA, USER_DETAILS } from "./actionTypes";
import { authAxios, gateAxios } from "../api";
import { removeTokens, saveTokenInLocal } from "../../utils/cacheStorage";
import { errorView, successMessage } from "../../helpers/ErrorHandler";

export const addToken = (token: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AUTH_TOKEN,
      payload: token,
    });
  };
};

export const checkToken = () => {
  const currentToken = localStorage.getItem("token");
  return (dispatch: Dispatch) => {
    dispatch({
      type: AUTH_TOKEN,
      payload: currentToken,
    });
  };
};

export const userLogin = (userDetails: any, navigate: any) => {
  return async (dispatch: Function) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      let res = await authAxios.post("user/auth", userDetails);
      saveTokenInLocal(res.data.token);
      dispatch({
        type: AUTH_TOKEN,
        payload: res.data.token,
      });
      navigate("/");
    } catch (err: any) {
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch: Function) => {    
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.get("user/userProfile");
      dispatch({
        type: USER_DETAILS,
        payload: res.data.data,
      });
    } catch (err: any) {
      errorView(err)
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const userRegister = (userData:any,navigate:any) => {
  return async (dispatch: Function) => {    
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await authAxios.post("user/signUp",userData);
      if(res){
        navigate("/auth")
      }
      dispatch({
        type: USER_DETAILS,
        payload: res?.data?.data,
      });
    } catch (err: any) {      
      errorView(err)
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const logout = (navigate:any) => {
  return (dispatch: Function) => {
    dispatch({
      type: RESET_DATA
    });
    removeTokens()
    navigate("/auth")
  };
};
