import React from "react";
import { Grid, Rating } from "semantic-ui-react";
import { CommonContainer } from "../../components";
import { RATING } from "../../config/constants";

const RatingView = ({ ratingValue }: any) => {
  return (
    <>
      <Grid className={`supplierDetailsMain`}>
        <Grid.Column
          computer={16}
          tablet={16}
          className={`supplierDetailsContent`}
        >
          <CommonContainer>
            <Grid>
              {RATING.map((data: any, index: any) => {
                return (
                  <Grid.Column
                    computer={16}
                    tablet={16}
                    className={index !== 0 ? "paddingRemoveTop" : ""}
                    onClick={() => ratingValue(data.value)}
                  >
                    <Rating
                      size="huge"
                      icon="star"
                      defaultRating={data.value}
                      maxRating={data.value}
                      disabled
                    />
                  </Grid.Column>
                );
              })}
            </Grid>
          </CommonContainer>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default RatingView;
