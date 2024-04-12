import React, { useEffect, useMemo } from "react";
import { Grid, MessageHeader, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CommentView, TabView, TitleBar } from "../../components";

import { RootState } from "../../store/reducer";
import { useDispatchApp } from "../../store/Store";
import {
  getEnquireData,
  getReviewDetailsBySupplierId,
} from "../../store/action/supplier";

import "./supplierEnquire.scss";
import { SupplierDashboardData } from "../../config/constants";
import { EnquireView } from "../../components/enquireView/EnquireView";

const SupplierEnquire = ({ route }: any) => {
  const dispatch = useDispatchApp();
  const { supplierData, supplierEnquire } = useSelector(
    (state: RootState) => state.supplier
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEnquireData(id));
    }
  }, [id]);

  const getPendingEnquire = useMemo(() => {
    return supplierEnquire.filter((e: any) => e.status == "pending");
  }, [supplierEnquire]);

  const getAcceptEnquiry = useMemo(() => {
    return supplierEnquire.filter((e: any) => e.status == "accept");
  }, [supplierEnquire]);

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
        <TitleBar
          titleName="Pending Enquiry"
          customPageTitleMain="customEnquiryTitleView"
        />
        <Grid className="weddingVenue ">
          <Grid.Column computer={16} tablet={16} mobile={16}>
            {getPendingEnquire.length > 0 ? (
              <EnquireView
                reviewData={getPendingEnquire || []}
                enableReply={true}
              />
            ) : (
              <Message>
                <MessageHeader>Not Available Pending Enquires</MessageHeader>
              </Message>
            )}
          </Grid.Column>
        </Grid>
        <TitleBar
          titleName="Accept Enquiry"
          customPageTitleMain="customEnquiryTitleView"
        />
        <Grid className="weddingVenue">
          <Grid.Column computer={16} tablet={16} mobile={16}>
            {getAcceptEnquiry.length > 0 ? (
              <EnquireView
                reviewData={getAcceptEnquiry || []}
                enableReply={true}
              />
            ) : (
              <Message>
                <MessageHeader>Not Available Accept Enquires</MessageHeader>
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </form>
    </>
  );
};

export default SupplierEnquire;
