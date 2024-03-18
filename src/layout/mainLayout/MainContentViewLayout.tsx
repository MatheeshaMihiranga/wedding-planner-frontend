import React, { ReactChildren, ReactChild, useState } from "react";
import { Modal, Loader } from "semantic-ui-react";

import MenuIcon from "../../assets/images/menuView.png";
import { CommonContainer } from "../../components/commonContainer/commonContainer";
import useWindowDimensions from "../../hooks/windowsSize";
import { Header, ImageView } from "../../components/index";

import "../mainContanier.scss";

interface MainContentViewLayoutProps {
  children: ReactChild | ReactChildren;
  currentPath: string;
}

export const MainContentViewLayout = ({
  children,
  currentPath,
}: MainContentViewLayoutProps) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <div className="viewMain" style={{ width: width }}>
      <div id="right" className="columns">
        <div className="top-right">
          <Header setVisible={setVisible} />
        </div>
        <div className={"rightBottomView"}>
          <CommonContainer
            currentPath={currentPath}
            styles={`customMainBottomContainer`}
          >
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
