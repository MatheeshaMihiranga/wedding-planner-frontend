import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";

import "./tavView.scss"
import { ImageView } from "../ImageView/ImageView";

export const TabView = ({ loadData = [] }: any) => {
  return (
    <>
      <Grid className="tabViewMain">
        {loadData.map((data: any, index: any) => {
          return (
            <Grid.Column key={index} computer={3} tablet={16} mobile={16} className="mainContentView">
                <ImageView customImageView="customImageViewTab" src={data.image} />
              <p>{data.text}</p>
            </Grid.Column>
          );
        })}
      </Grid>
    </>
  );
};
