import Login from "../screens/login/Login";
import Dashboard from "../screens/dashboard/Dashboard";
import PasswordReset from "../screens/passwordReset/PasswordReset";
import PasswordForgot from "../screens/forgotPassword/ForgotPassword";
import RegisterUser from "../screens/registerUser/Register";
import UserDashBoard from "../screens/userDashboard/UserDashboard";

export const CommonRoutes = [
  {
    path: "/dashboard",
    route: <Dashboard />,
    protectRoutes: false,
  },
  {
    path: "/dashboard/:id",
    route: <UserDashBoard />,
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
