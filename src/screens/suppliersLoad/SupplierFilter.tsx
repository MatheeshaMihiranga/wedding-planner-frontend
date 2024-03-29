import React from "react";
import { Grid } from "semantic-ui-react";
import { CommonContainer } from "../../components";

import "./supplierDetails.scss"

const SuppliersFilter = () => {
  return (
    <>
      <Grid className={`supplierDetailsMain`}>
        <Grid.Column
          computer={16}
          tablet={16}
          className={`supplierDetailsContent`}
        >
          <CommonContainer></CommonContainer>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SuppliersFilter;
