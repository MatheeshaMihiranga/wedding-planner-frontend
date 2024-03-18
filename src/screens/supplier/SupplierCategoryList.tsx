import React from "react";
import { Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { Categories } from "../../config/constants";
import { TitleBar } from "../../components";

import "./SuppllierCategory.scss";

const SupplierCategoryList = () => {
  const navigate = useNavigate()
  return (
    <>
    <TitleBar titleName={"Supplier Category"}/>
      {Categories.map((data: any) => {
        return (
          <Grid  className="categoryViewTop" onClick={()=>navigate(`/supplier/${data.navigate}`)}>
            <Grid.Column computer={16} className="categoryViewMain">
              <p className="categoryName">{data.text}</p>
            </Grid.Column>
          </Grid>
        );
      })}
    </>
  );
};

export default SupplierCategoryList;
