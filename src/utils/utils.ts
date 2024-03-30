
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
