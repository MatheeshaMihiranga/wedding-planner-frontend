import _ from "lodash";

import {
  LOADING,
  SUPPLIER_DATA,
  SUPPLIER_ENQUIRE,
  SUPPLIER_FILTER_DATA,
  SUPPLIER_REVIEWS,
  SUPPLIER_SEARCH_DATA,
} from "./actionTypes";
import { gateAxios } from "../api";
import { errorView, successMessage } from "../../helpers/ErrorHandler";
import { RootState } from "../reducer";
import { getUserDetails } from "./auth";

export const getSupplierDataById = (id: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      dispatch(getUserDetails());
      let res = await gateAxios.get(`supplier/getSupplier/${id}`);
      dispatch({
        type: SUPPLIER_DATA,
        payload: res.data.data,
      });
      dispatch({
        type: SUPPLIER_REVIEWS,
        payload: res?.data?.data?.reviewId?.reviews || [],
      });
      dispatch({
        type: SUPPLIER_ENQUIRE,
        payload: res?.data?.data?.enquireId?.enquires || [],
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

export const updateSupplierData = (
  supplierData: any,
  supplierCategory: any,
  navigate: any
) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.put(
        `supplier/update/${supplierData.id}/`,
        supplierData.data
      );
      if (res) {
        successMessage("Update supplier data successfully");
        dispatch(getUserDetails());
        navigate(
          `/supplier/supplier-data/${res.data.data._id}?category=${supplierCategory}`
        );
      }
      dispatch({
        type: SUPPLIER_DATA,
        payload: res?.data?.data,
      });
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const createSupplierPackages = (packageData: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.post(
        `/packages/createPackages/${packageData.id}`,
        packageData.data
      );
      successMessage("Package added successfully");
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const updateSupplierPackages = (packageData: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.put(
        `/packages/updatePackages/${packageData.id}/${packageData.packageId}`,
        packageData.data
      );
      successMessage("Package updated successfully");
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const deleteSupplierPackages = (packageData: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.delete(
        `/packages/deletePackageData/${packageData.id}/${packageData.packageId}`,
        packageData.data
      );
      successMessage("Package delete successfully");
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const searchSupplierData = (type?: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.post(`/supplier/getSupplier`, { type });
      successMessage("Package delete successfully");
      dispatch({
        type: SUPPLIER_SEARCH_DATA,
        payload: res.data.data,
      });
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const supplierFilterDetails = (filterData?: any) => {
  return async (dispatch: Function, getState: () => RootState) => {
    let { supplierFilterData } = getState().supplier;

    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let filterSupplierData = {
        ...supplierFilterData,
        ...filterData,
      };
      dispatch({
        type: SUPPLIER_FILTER_DATA,
        payload: filterSupplierData,
      });
      let res = await gateAxios.post(`/supplier/getSupplier`, filterData);
      dispatch({
        type: SUPPLIER_SEARCH_DATA,
        payload: res.data.data,
      });
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const addComment = (data?: any) => {
  return async (dispatch: Function, getState: () => RootState) => {
    let { supplierData } = getState().supplier;
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.post(
        `/review/createReview/${data.reviewId}`,
        data.data
      );
      dispatch(getSupplierDataById(supplierData._id));
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const updateComment = (data?: any) => {
  return async (dispatch: Function, getState: () => RootState) => {
    let { supplierData } = getState().supplier;
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.put(
        `/review/updateReviews/${data.parentId}/${data.reviewId}`,
        data.data
      );
      dispatch(getSupplierDataById(supplierData._id));
      return res;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const getReviewDetailsBySupplierId = (id: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      dispatch(getUserDetails());
      let res = await gateAxios.get(`review/getAllReviewBySupplier/${id}`);
      dispatch({
        type: SUPPLIER_REVIEWS,
        payload: res.data.data.reviews,
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

export const createEnquireForSupplier = (data: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      await gateAxios.post(`enquire/createEnquire/${data.parentId}`, data.data);
      dispatch(getUserDetails());
      return true;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const getEnquireData = (id: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const res = await gateAxios.get(
        `enquire/getAllEnquireBySupplierId/${id}`
      );
      dispatch({
        type: SUPPLIER_ENQUIRE,
        payload: res.data.data?.enquires || [],
      });
      return true;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};

export const updateEnquireData = (data: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      await gateAxios.put(
        `enquire/updateEnquire/${data.parentId}/${data.enquireId}`,
        data.data
      );
      dispatch(getUserDetails());
      return true;
    } catch (err: any) {
      errorView(err);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
};
