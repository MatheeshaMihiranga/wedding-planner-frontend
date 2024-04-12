import { isEmpty } from "lodash";

export const getCompanyLogo = (theme: any) => {
  switch (theme) {
    case "BLUE":
      return require("../assets/images/logo.png");
    default:
      return require("../assets/images/dashboard.png");
  }
};

export const getSupplierPackageEnable = (type: any) => {
  switch (type) {
    case "BLUE":
      return require("../assets/images/logo.png");
    default:
      return require("../assets/images/dashboard.png");
  }
};

export const formatDate = (dateValue: any) => {
  const date = new Date(dateValue);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const handleDashBoard = (
  userRole: any,
  userDetails: any,
  navigate: any
) => {
  if (userRole === "user") {
    navigate(`/user-dashboard/${userDetails._id}`);
  } else if (userRole === "supplier") {
    if (isEmpty(userDetails?.supplierId?.categoryType)) {
      navigate(`/supplier/categoryList`);
    } else {
      navigate(`/supplier-dashboard/${userDetails.supplierId?._id}`);
    }
  } else {
    navigate(`/dashboard`);
  }
};
