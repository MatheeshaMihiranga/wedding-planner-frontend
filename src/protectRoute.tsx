import { Navigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { getTokenInLocal } from "./utils/cacheStorage";

const ProtectRoute = ({ children, redirectTo, protectRoutes }: any) => {
  if (isEmpty(getTokenInLocal()) && protectRoutes) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

export default ProtectRoute;
