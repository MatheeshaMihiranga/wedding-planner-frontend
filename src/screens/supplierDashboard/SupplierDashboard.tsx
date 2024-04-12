import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { getSupplierDataById } from "../../store/action/supplier";
import { TabView } from "../../components";
import { SupplierDashboardData } from "../../config/constants";
import SupplierBusinessData from "./SupplierBusinessData";
import { RootState } from "../../store/reducer";
import { useSelector } from "react-redux";

const SupplierDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp()
  const { supplierData } = useSelector((state: RootState) => state.supplier);

  useEffect(() => {
    if (id) {
      dispatch(getSupplierDataById(id));
    }
  }, [id]);

  return <>
  <TabView loadData={SupplierDashboardData} id={supplierData?._id}/>
  <SupplierBusinessData/>
 </>
};

export default SupplierDashboard;
