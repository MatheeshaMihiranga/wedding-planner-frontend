
import MySupplier from "../screens/mySuppliers/MySuppliers";

export const UserRoutes = [
  {
    path: "my-supplier/:id",
    route: <MySupplier/>,
    protectRoutes: true,
  }
];
