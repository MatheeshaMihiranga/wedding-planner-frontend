import { Dispatch } from "redux";
import _ from "lodash";

import {
  AUTH_TOKEN,
  LOADING,
  RESET_DATA,
  SUPPLIER_DATA,
  USER_DETAILS,
  SUPPLIER_REVIEWS,
  SUPPLIER_ENQUIRE,
} from "./actionTypes";
import { authAxios, gateAxios } from "../api";
import { removeTokens, saveTokenInLocal } from "../../utils/cacheStorage";
import { errorView, successMessage } from "../../helpers/ErrorHandler";
import { handleDashBoard } from "../../utils/utils";

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
      if(res){
        saveTokenInLocal(res.data.token);
        dispatch({
          type: AUTH_TOKEN,
          payload: res.data.token,
        });
        dispatch(getUserDetails(navigate));
      }
    } catch (err: any) {
      errorView(err)
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const getUserDetails = (navigate?: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.get("user/userProfile");
      let isSupplierAvailable = res?.data?.data?.supplierId || false;
      if (navigate) {
        handleDashBoard(res.data.data.role, res.data.data, navigate);
      }
      dispatch({
        type: USER_DETAILS,
        payload: res.data.data,
      });
      if (isSupplierAvailable) {
        dispatch({
          type: SUPPLIER_DATA,
          payload: isSupplierAvailable,
        });
        dispatch({
          type: SUPPLIER_REVIEWS,
          payload: isSupplierAvailable.reviewId?.reviews || [],
        });
        dispatch({
          type: SUPPLIER_ENQUIRE,
          payload: isSupplierAvailable.enquireId?.enquires || [],
        });
      }
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const userRegister = (userData: any, navigate: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await authAxios.post("user/signUp", userData);
      if (res) {
        navigate("/auth");
      }
      dispatch({
        type: USER_DETAILS,
        payload: res?.data?.data,
      });
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const logout = (navigate: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: RESET_DATA,
    });
    removeTokens();
    navigate("/auth");
  };
};
