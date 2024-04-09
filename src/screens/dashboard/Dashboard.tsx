import React from "react";
import { ImageView } from "../../components";
import { images } from "../../assets/images";

import "./dashboard.scss";
import { Grid } from "semantic-ui-react";
import { CommonDashboardDetails } from "../../config/constants";

const Dashboard = () => {
  return (
    <>
      <div className="containerCommonDashboard">
        <ImageView
          customImageView={"commonDashboardImage"}
          src={images.CommonDashboard}
        />
        <p className="centeredCommonDashboardText">
          Wedding Planning Made Simple.
        </p>
        <p className="centeredSubCommonDashboardText">
          Your Inspiration, Your Style, Bliss Makes it Happen.
        </p>
      </div>

      {CommonDashboardDetails.map((data: any, index: any) => {
        const numberCheck = index % 2;
        return (
          <Grid
            className={
              numberCheck == 0
                ? "commonDashboardColorMain"
                : "commonDashboardWithoutColorMain"
            }
          >
            <Grid.Column
              computer={8}
              className={
                numberCheck == 0
                  ? "commonDashboardContentTextRight"
                  : "commonDashboardContentImageAlign"
              }
            >
              {numberCheck == 0 ? (
                <>
                  <h3>{data.mainTile}</h3>
                  <h5>{data.subTitle}</h5>
                </>
              ) : (
                <ImageView
                  customImageView={"commonDashboardContentImage"}
                  src={data.image}
                />
              )}
            </Grid.Column>
            <Grid.Column
              computer={8}
              className={
                numberCheck == 1
                  ? "commonDashboardContentTextLeft"
                  : "commonDashboardContentImageAlign"
              }
            >
              {numberCheck == 1 ? (
                <>
                  <h3>{data.mainTile}</h3>
                  <h5>{data.subTitle}</h5>
                </>
              ) : (
                <ImageView
                  customImageView={"commonDashboardContentImage"}
                  src={data.image}
                />
              )}
            </Grid.Column>
          </Grid>
        );
      })}
    </>
  );
};
export default Dashboard;
