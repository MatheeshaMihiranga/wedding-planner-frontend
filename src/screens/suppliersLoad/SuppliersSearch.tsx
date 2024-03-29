import React from "react";
import { Grid } from "semantic-ui-react";
import { TitleBar } from "../../components";
import { useLocation } from "react-router-dom";
import SuppliersFilter from "./SupplierFilter";
import SuppliersListView from "./SuppliersListView";

const SuppliersSearch = () => {
  const { state: navigationState }: any = useLocation();
  const supplierCategory = navigationState?.categoryType;
  
  return (
    <>
      <TitleBar titleName={`Wedding ${supplierCategory}`} />
      <Grid>
        <Grid.Column computer={4}>
          <SuppliersFilter/>
        </Grid.Column>
        <Grid.Column computer={12}>
          <SuppliersListView/>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SuppliersSearch;
