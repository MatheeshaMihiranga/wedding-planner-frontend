import React from "react";
import {
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import { CommonContainer } from "../../components";

import SupplierViewCard from "./SupplierCard";
import getWindowDimensions from "../../hooks/windowsSize";

import "./supplierDetails.scss";


const SuppliersListView = ({supplierSearchData}:any) => {
  const { height } = getWindowDimensions();

  return (
    <>
      <Grid className={`supplierDetailsMain`}>
        <Grid.Column
          computer={16}
          tablet={16}
          className={`supplierDetailsContent`}
          style={{ height: height - 190 }}
        >
          <CommonContainer>
            <Grid columns={4} divided>
              <GridRow>
                {supplierSearchData.map((data:any)=>{
                  return(
                    <GridColumn>
                    <SupplierViewCard data={data}/>
                  </GridColumn>
                  )
                })}
               
              </GridRow>
            </Grid>
          </CommonContainer>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SuppliersListView;
