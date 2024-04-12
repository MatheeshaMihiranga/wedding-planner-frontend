import React from "react"
import { Button, Modal, Grid, Rating } from "semantic-ui-react";

import "./commentView.scss"

export const CommentView = ({reviewData = []}:any) =>{
    return reviewData.map((data:any)=>{
        return (
            <Grid className="userReviewContentView">
                 <Grid.Column computer={16} className="paddingRemoveBottom commentViewWithUser">
                 <p className="commentUserName">{data?.userName}</p>
                 <Rating
                      size="huge"
                      icon="star"
                      defaultRating={data.reviewCount}
                      maxRating={5}
                      disabled
                    />
                </Grid.Column>
                <Grid.Column computer={16} className="paddingRemoveTop" >
                    <p className="commentView">{data?.userReview}</p>
                </Grid.Column>
            </Grid>
        )
    })
   
}

