
import SupplierCategoryList from "../screens/supplier/SupplierCategoryList";
import SupplierData from "../screens/supplierData/SupplierData";
import SupplierDetailsView from "../screens/supplierDetailsView/SupplierDetailsView";
import SupplierReviews from "../screens/supplierReviews.tsx/SupplierReviews";
import SuppliersSearch from "../screens/suppliersLoad/SuppliersSearch";

export const SupplierRoutes = [
  {
    path: "categoryList",
    route: <SupplierCategoryList />,
    protectRoutes: false,
  },
  {
    path: "supplier-register",
    route: <SupplierData />,
    protectRoutes: false,
  },
  {
    path: "supplier-data/:id",
    route: <SupplierData />,
    protectRoutes: false,
  },
  {
    path: "supplier-search",
    route: <SuppliersSearch />,
    protectRoutes: false,
  },
  {
    path: "supplier-details/:id",
    route: <SupplierDetailsView />,
    protectRoutes: false,
  },
  {
    path: "supplier-reviews/:id",
    route: <SupplierReviews />,
    protectRoutes: false,
  },
];
