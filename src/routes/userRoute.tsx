
import MySupplier from "../screens/mySuppliers/MySuppliers";
import UserCheckList from "../screens/userCheckList/UserCheckList";

export const UserRoutes = [
  {
    path: "my-supplier/:id",
    route: <MySupplier/>,
    protectRoutes: true,
  },
  {
    path: "my-checkList/:id",
    route: <UserCheckList/>,
    protectRoutes: true,
  }
];
