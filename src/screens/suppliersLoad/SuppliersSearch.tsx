import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { TitleBar } from "../../components";
import { useLocation } from "react-router-dom";
import SuppliersFilter from "./SupplierFilter";
import SuppliersListView from "./SuppliersListView";
import { useDispatch, useSelector } from "react-redux";
import { useDispatchApp } from "../../store/Store";
import { supplierFilterDetails } from "../../store/action/supplier";
import { RootState } from "../../store/reducer";

const SuppliersSearch = () => {
  const dispatch = useDispatchApp()
  const { state: navigationState }: any = useLocation();
  const supplierCategory = navigationState?.categoryType;
  const {supplierSearchData} = useSelector((state:RootState)=> state.supplier)

  useEffect(()=>{
    dispatch(supplierFilterDetails({type:supplierCategory}))
  },[supplierCategory])

  const filterSupplierData = (data:any) =>{
    dispatch(supplierFilterDetails(data))
  }
  
  return (
    <>
      <TitleBar titleName={`Wedding ${supplierCategory}`} />
      <Grid>
        <Grid.Column computer={4}>
          <SuppliersFilter supplierCategory={supplierCategory} filterSupplierData={(data:any)=>filterSupplierData(data)}/>
        </Grid.Column>
        <Grid.Column computer={12}>
          <SuppliersListView supplierSearchData={supplierSearchData}/>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SuppliersSearch;
