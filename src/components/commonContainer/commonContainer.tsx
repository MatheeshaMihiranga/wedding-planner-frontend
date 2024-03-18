import "./container.scss";

export const CommonContainer = ({ children, left, right, styles , currentPath}: any) => {
  let containerStyle;
  if (left) {
    containerStyle = `topLeftContainer ${styles}`;
  } else if (right) {
    containerStyle = `topRightContainer ${styles}`;
  } else if (currentPath) {
    containerStyle = `drawerContainer ${styles}`;
  } else {
    containerStyle = `defaultContainer ${styles}`;
  }

  return <div className={containerStyle}>{children}</div>;
};
