
import SupplierCategoryList from "../screens/supplier/SupplierCategoryList";
import WeddingVenues from "../screens/supplierVenues/WeddingVenues";

export const SupplierRoutes = [
  {
    path: "categoryList",
    route: <SupplierCategoryList />,
    protectRoutes: false,
  },
  {
    path: "wedding-venus",
    route: <WeddingVenues />,
    protectRoutes: false,
  },
];
