import React, { useState } from "react";
import { Button, Modal, Grid, Rating } from "semantic-ui-react";

import "./commentView.scss";
import { CustomButton } from "../button/Button";
import { isEmpty } from "lodash";
import AddCommentModal from "../addComment/AddCommentModal";
import ReplayCommentModal from "../addComment/ReplayCommentModal";

import { formatDistance } from 'date-fns';

export const CommentView = ({ reviewData = [], enableReply = false }: any) => {
  const [visibleComment, setVisibleComment] = useState(false);
  const [selectData, setSelectData] = useState({});

  return (
    <>
      {reviewData.map((data: any) => {
        return (
          <>
            <Grid className="userReviewContentView">
              <Grid.Column
                computer={16}
                className="paddingRemoveBottom commentViewWithUser"
              >
                <div className="review-header">
                  <div className="username-container">
                    <span>{data?.userName}</span>
                  </div>
                  <div className="rating-container">
                    <Rating
                      size="huge"
                      icon="star"
                      defaultRating={data.reviewCount}
                      maxRating={5}
                      disabled
                    />
                  </div>
                  <div className="createdAt-container">
                    <span>{data?.createdAt && formatDistance(new Date(data?.createdAt), new Date(), { addSuffix: true})}</span>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column computer={16} className="paddingRemoveTop">
                <p className="commentView">{data?.userReview}</p>
                {enableReply && isEmpty(data?.supplierReview) ? (
                  <CustomButton
                    title="Reply"
                    onClick={() => {
                      setSelectData(data);
                      setVisibleComment(true);
                    }}
                  />
                ) : null}
              </Grid.Column>
              <Grid.Column computer={16} className="paddingRemoveTop commentReplyViewMain">
                {enableReply && !isEmpty(data?.supplierReview) ? (
                  <p className="commentViewReply">{data?.supplierReview}</p>
                ) : !isEmpty(data?.supplierReview) ? (
                  <p className="commentViewReply">{data?.supplierReview}</p>
                ) : null}
              </Grid.Column>
            </Grid>
          </>
        );
      })}
      <ReplayCommentModal
        title="Reply Comment"
        viewModal={visibleComment}
        reviewData={selectData}
        cancel={() => {
          setSelectData({});
          setVisibleComment(false);
        }}
      />
    </>
  );
};
