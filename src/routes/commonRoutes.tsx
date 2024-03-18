import Login from "../screens/login/Login";
import Dashboard from "../screens/dashboard/Dashboard";
import PasswordReset from "../screens/passwordReset/PasswordReset";
import PasswordForgot from "../screens/forgotPassword/ForgotPassword";
import RegisterUser from "../screens/registerUser/Register";

export const CommonRoutes = [
  {
    path: "/",
    route: <Dashboard />,
    protectRoutes: false,
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
