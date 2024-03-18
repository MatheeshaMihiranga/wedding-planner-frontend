import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CommonContainer } from "../commonContainer/commonContainer";
import defaultUserImage from "../../assets/images/default_profile_pic.jpeg";
import { HeaderWebView } from "./HeaderWebView";
import { HeaderMobileView } from "./HeaderMobileView";
import { nameSort } from "../../helpers/NameSort";
import { ImageView } from "../ImageView/ImageView";
import { Icon } from "semantic-ui-react";

import "./Header.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { logout } from "../../store/action/auth";
import { useDispatchApp } from "../../store/Store";

export const Header = memo(({ isLogin }: any) => {
  const navigate: any = useNavigate();
  let { token,userDetails } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatchApp()

  useEffect(() => {}, []);
  const options = [
    {
      key: 1,
      text: "Logout",
      value: 1,
      onClick: () => {
       dispatch(logout(navigate))
      },
    },
  ];  

  

  const userImage = (
    <>
      {token ? (
        <>
          <label className="userName">
            Hi, {nameSort(userDetails?.name || "")}
          </label>
          <ImageView
            avatar={true}
            imgOne={defaultUserImage}
            imgTwo={defaultUserImage}
            addRandomId={false}
            customImageView={"userProfileTopHeader"}
          />
          <Icon name="angle down" size="large" color="black" />
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      <HeaderWebView
        options={options}
        userImage={userImage}
        navigate={navigate}
        token={token}
      />
      <CommonContainer>
        <HeaderMobileView
          options={options}
          userImage={userImage}
          navigate={navigate}
        />
      </CommonContainer>
    </>
  );
});
