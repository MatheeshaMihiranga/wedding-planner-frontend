import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { getSupplierDataById } from "../../store/action/supplier";
import { TabView } from "../../components";
import { SupplierDashboardData } from "../../config/constants";

const SupplierDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp()

  useEffect(() => {
    if (id) {
      dispatch(getSupplierDataById(id));
    }
  }, [id]);

  return <>
  <TabView loadData={SupplierDashboardData}/>
 </>
};

export default SupplierDashboard;
