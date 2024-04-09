import Login from "../screens/login/Login";
import Dashboard from "../screens/dashboard/Dashboard";
import PasswordReset from "../screens/passwordReset/PasswordReset";
import PasswordForgot from "../screens/forgotPassword/ForgotPassword";
import RegisterUser from "../screens/registerUser/Register";
import UserDashBoard from "../screens/userDashboard/UserDashboard";
import SupplierDashboard from "../screens/supplierDashboard/SupplierDashboard";

export const CommonRoutes = [
  {
    path: "/dashboard",
    route: <Dashboard />,
    protectRoutes: false,
  },
  {
    path: "/user-dashboard/:id",
    route: <UserDashBoard />,
    protectRoutes: true,
  },
  {
    path: "/supplier-dashboard/:id",
    route: <SupplierDashboard />,
    protectRoutes: true,
  },
  {
    path: "/auth",
    route: <Login />,
    protectRoutes: false,
  },
  {
    path: "/password-reset",
    route: <PasswordReset />,
    protectRoutes: false,
  },
  {
    path: "/password-forgot",
    route: <PasswordForgot />,
    protectRoutes: false,
  },
  {
    path: "/register",
    route: <RegisterUser />,
    protectRoutes: false,
  },
];
