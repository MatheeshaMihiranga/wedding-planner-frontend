import React, { ReactChildren, ReactChild, useState } from "react";
import { Modal, Loader } from "semantic-ui-react";

import { Header } from "../../components/index";
import { CommonContainer } from "../../components/commonContainer/commonContainer";
import useWindowDimensions from "../../hooks/windowsSize";

import "./mainContanierLogin.scss";

interface childProps {
  children: ReactChild | ReactChildren;
}

export const MainContentLoginLayout = ({ children }: any) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <div className="viewMain" style={{ width: width }}>
      <div id="right" className="columns">
        <div className="top-right">
          <Header
            isLogin={true}
            setVisible={setVisible}
          />
        </div>
        <div className="rightBottomView">
          <CommonContainer styles={"customMainBottomContainer"}>
            {children}
          </CommonContainer>
        </div>
      </div>
      <Modal open={false}>
        <Loader inverted content="Loading" />
      </Modal>
    </div>
  );
};
