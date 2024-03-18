import React from "react";
import { Grid } from "semantic-ui-react";
import { CommonContainer } from "../commonContainer/commonContainer";
import "./titleBar.scss";

export const TitleBar = ({
  titleName = "",
  customPageTitleMain = "",
  customPageTitleContainer = "",
  customPageTitle = "",
}) => {

  return (
    <Grid className={`pageTitleMain ${customPageTitleMain}`}>
      <Grid.Column
        computer={16}
        tablet={16}
        className={`pageTitleContainer ${customPageTitleContainer}`}
      >
        <CommonContainer>
          <p className={`pageTitle ${customPageTitle}`}>{titleName}</p>
        </CommonContainer>
      </Grid.Column>
    </Grid>
  );
};
