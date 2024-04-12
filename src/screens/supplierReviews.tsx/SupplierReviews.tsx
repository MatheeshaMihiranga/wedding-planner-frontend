import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CommentView, TabView } from "../../components";

import { RootState } from "../../store/reducer";
import { useDispatchApp } from "../../store/Store";
import { getReviewDetailsBySupplierId } from "../../store/action/supplier";

import "./supplierReviews.scss";
import { SupplierDashboardData } from "../../config/constants";

const SupplierReviews = ({ route }: any) => {
  const dispatch = useDispatchApp();
  const { supplierData, supplierReview } = useSelector(
    (state: RootState) => state.supplier
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getReviewDetailsBySupplierId(id));
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const {
    register: registerPackage,
    handleSubmit: handleSubmitPackages,
    formState: { errors: packageErrors },
    control: packageControl,
  } = useForm();

  const onSubmit = (data: any) => {};
  return (
    <>
      <TabView loadData={SupplierDashboardData} id={supplierData?._id} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="weddingVenue">
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <CommentView reviewData={supplierReview || []} />
          </Grid.Column>
        </Grid>
      </form>
    </>
  );
};

export default SupplierReviews;
