
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