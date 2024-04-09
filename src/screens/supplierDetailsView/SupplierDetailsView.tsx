import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Table } from "semantic-ui-react";
import { useSelector } from "react-redux";

import {
  CommonTable,
  CustomButton,
  ImageView,
  TitleBar,
  TitleView,
  CommentView,
} from "../../components";
import {
  WeddingVenuesDetails,
  WeddingPackageTableDetails,
} from "../../config/constants";

import { useDispatchApp } from "../../store/Store";
import { getSupplierDataById } from "../../store/action/supplier";
import { RootState } from "../../store/reducer";

import "./supplierDetailsView.scss";
import RatingView from "../../components/rating/Rating";
import AddCommentModal from "../../components/addComment/AddCommentModal";

const SupplierDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const { supplierData } = useSelector((state: RootState) => state.supplier);
  const [visibleComment, setVisibleComment] = useState(false);
  const isCategoryVenue = supplierData?.categoryType === "Venues" || false;
  const packageData = supplierData?.packageId?.packages || [];

  useEffect(() => {
    if (id) {
      dispatch(getSupplierDataById(id));
    }
  }, [id]);

  const loadTableData = () => {
    return packageData.map((data: any, index: number) => {
      return (
        <Table.Row className="tbleR" key={index}>
          <Table.Cell>
            <p>{data?.packageName ?? ""}</p>
          </Table.Cell>
          {isCategoryVenue ? (
            <>
              <Table.Cell>
                <p>{data?.hallName ?? ""}</p>
              </Table.Cell>
            </>
          ) : null}
          <Table.Cell>
            <p>
              {isCategoryVenue
                ? data?.maxCount ?? ""
                : data?.packageDescription ?? ""}
            </p>
          </Table.Cell>
          <Table.Cell>
            <p>{data?.price ?? ""}</p>
          </Table.Cell>
          {isCategoryVenue ? (
            <Table.Cell>
              <p>{data?.packageDescription ?? ""}</p>
            </Table.Cell>
          ) : null}
        </Table.Row>
      );
    });
  };

  return (
    <>
      <TitleBar titleName={supplierData.supplierName} />
      <Grid className={`supplierDetailsMain`}>
        {supplierData?.images?.map((data: any) => {
          return (
            <Grid.Column computer={4}>
              <ImageView
                src={data}
                customImageView={"supplierDetailsImageView"}
              />
            </Grid.Column>
          );
        })}
        <Grid.Column computer={16}>
          <TitleView title="Supplier Description" />
          <p>{supplierData?.description}</p>
        </Grid.Column>
        <Grid.Column computer={16}>
          <TitleView title="Supplier Location" />
          <p>{supplierData?.location}</p>
        </Grid.Column>
        <Grid.Column computer={16}>
          <TitleView title="Package Details" />
          {packageData.length !== 0 ? (
            <CommonTable
              tableHeaderData={
                isCategoryVenue
                  ? WeddingVenuesDetails
                  : WeddingPackageTableDetails
              }
            >
              {loadTableData()}
            </CommonTable>
          ) : null}
        </Grid.Column>
        <Grid.Column computer={16}>
          <TitleView title="Reviews" />
          <RatingView ratingValue={(data: any) => {}} />
        </Grid.Column>
        <Grid.Column computer={16}>
          <CustomButton
            title="Add Review"
            onClick={() => setVisibleComment(true)}
          />
        </Grid.Column>
        <Grid.Column computer={16}>
        <TitleView title="Reviews" />
          <CommentView reviewData={supplierData?.reviewId?.reviews || []} />
        </Grid.Column>
      </Grid>
      <AddCommentModal
        title="Add Comment"
        viewModal={visibleComment}
        cancel={() => setVisibleComment(false)}
      />
    </>
  );
};

export default SupplierDetailsView;
