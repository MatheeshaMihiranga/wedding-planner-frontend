import React from "react";

import "./titleView.scss";

export const TitleView = ({
  title,
  CustomTitleViewMain,
  CustomTextTitle,
}: any) => {
  return (
    <div className={`titleViewMain ${CustomTitleViewMain}`}>
      <p className={`textTitle ${CustomTextTitle}`}>{title}</p>
    </div>
  );
};
