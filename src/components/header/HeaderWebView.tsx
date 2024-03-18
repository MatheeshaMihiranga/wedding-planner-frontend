import { memo } from "react";
import { Grid, Dropdown } from "semantic-ui-react";

import "./Header.scss";
import { LOGO } from "../../config/constants";
import { CustomButton } from "../button/Button";

export const HeaderWebView = memo(
  ({ options, userImage, navigate, token }: any) => {
    return (
      <div className="mainContent">
        <Grid verticalAlign="middle" className="headerDefaultView" centered>
          <Grid.Column computer={3} className="rightContent" only="computer">
            <div onClick={() => navigate("/")}>
              <img src={LOGO} alt="logo" className="logo" />
            </div>
          </Grid.Column>
          <Grid.Column computer={13} only="computer" className="mainCenterView">
            <div className="headerRightView">
              {!token ? (
                <>
                  <CustomButton
                    theme="green"
                    title="Sign in"
                    onClick={() => navigate("/auth")}
                  />
                  <CustomButton
                    title="Sign up"
                    onClick={() => navigate("/register")}
                  />
                </>
              ) : (
                <>
                  <CustomButton
                    theme="green"
                    title="Suppliers"
                    onClick={() => 
                      navigate("/supplier/categoryList")
                    }
                    customButtonStyle="headerSupplierButton"
                    customColumnStyle="headerSupplierButton"
                  />
                  <Dropdown
                    trigger={userImage}
                    options={options}
                    pointing="top left"
                    icon={null}
                  />
                </>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
);