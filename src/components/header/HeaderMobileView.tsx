import { memo } from "react";
import { Grid, Dropdown } from "semantic-ui-react";

import "./Header.scss";
import { LOGO } from "../../config/constants";

export const HeaderMobileView = memo(
  ({ options, userImage, navigate }: any) => {
    return (
      <div className="mainContentMobile">
        <Grid centered>
          <Grid.Column
            mobile={8}
            tablet={8}
            only="tablet mobile"
            className="rightContent "
            onClick={() => navigate("/")}
          >
            <img src={LOGO} alt="logo" className="logo" />
          </Grid.Column>
          <Grid.Column
            mobile={8}
            tablet={8}
            only="tablet mobile"
            textAlign="right"
            className="removePadding"
          >
            <div className="userDiv">
              <Dropdown
                trigger={userImage}
                options={options}
                pointing="top left"
                icon={null}
              />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
);
