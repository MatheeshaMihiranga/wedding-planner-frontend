import React from "react";
import { Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { Categories } from "../../config/constants";
import { TitleBar } from "../../components";

import "./SuppllierCategory.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

const SupplierCategoryList = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const userRole = userDetails.role;
  const isUser = userRole === "user" ? true : false;

  return (
    <>
      <TitleBar titleName={"Supplier Category"} />
      {Categories.map((data: any) => {
        return (
          <Grid
            className="categoryViewTop"
            onClick={() =>
              navigate(
                isUser
                  ? `/supplier/supplier-search?category=${data.categoryType}`
                  : `/supplier/${data.navigate}?category=${data.categoryType}`
              )
            }
          >
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
