
import SupplierCategoryList from "../screens/supplier/SupplierCategoryList";
import SupplierData from "../screens/supplierData/SupplierData";
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
];
