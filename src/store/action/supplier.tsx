import _ from "lodash";

import { LOADING, SUPPLIER_DATA } from "./actionTypes";
import { gateAxios } from "../api";
import { errorView, successMessage } from "../../helpers/ErrorHandler";

export const getSupplierDataById = (id: any) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      let res = await gateAxios.get(`supplier/getSupplier/${id}`);
      dispatch({
        type: SUPPLIER_DATA,
        payload: res.data.data,
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

export const updateSupplierData = (supplierData: any, navigate: any) => {
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
        navigate(`/supplier/supplier-data/${res.data.data._id}`);
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
