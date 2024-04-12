import React, { useState } from "react";
import { Button, Modal, Grid, Rating } from "semantic-ui-react";

import "./enquireView.scss";
import { CustomButton } from "../button/Button";
import { isEmpty } from "lodash";
import ReplayCommentModal from "../addComment/ReplayCommentModal";
import { useDispatchApp } from "../../store/Store";
import { updateEnquireData } from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

export const EnquireView = ({ reviewData = [] }: any) => {
  const dispatch = useDispatchApp();
  const [visibleEnquire, setVisibleEnquire] = useState(false);
  const [selectData, setSelectData] = useState({});
  const { supplierData } = useSelector((state: RootState) => state.supplier);

  const updateEnquireDetails = (id: any, status: any) => {
    const enquireData = {
      parentId: supplierData?.enquireId?._id,
      enquireId: id,
      data: {
        status: status,
      },
    };
    dispatch(updateEnquireData(enquireData));
  };

  return (
    <>
      {reviewData.map((data: any) => {
        return (
          <>
            <Grid className="userReviewContentView">
              <Grid.Column computer={16} className="paddingRemoveBottom">
                <p>Enquire Request Date : </p>
                <p className="commentView">{data?.date}</p>
              </Grid.Column>
              <Grid.Column computer={16} className="enquireButtonViewMain">
                {data.status == "pending" ? (
                  <>
                    <CustomButton
                      title="Accept"
                      theme="blue"
                      onClick={() => {
                        updateEnquireDetails(data._id, "accept");
                      }}
                    />
                    <CustomButton
                      title="Cancel"
                      onClick={() => {
                        updateEnquireDetails(data._id, "cancel");
                      }}
                    />
                  </>
                ) : null}
              </Grid.Column>
            </Grid>
          </>
        );
      })}
      <ReplayCommentModal
        title="Reply Comment"
        viewModal={visibleEnquire}
        reviewData={selectData}
        cancel={() => {
          setSelectData({});
          setVisibleEnquire(false);
        }}
      />
    </>
  );
};
