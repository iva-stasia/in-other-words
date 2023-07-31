import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import MainLayout from "../layout/MainLayout";
import AllWords from "../pages/AllWords";
import PasswordReset from "../pages/authentication/PasswordReset";
import PasswordResetSent from "../pages/authentication/PasswordResetSent";
import AuthLayout from "../layout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AllWords />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/password-reset",
        element: <PasswordReset />,
      },
      {
        path: "/password-reset-sent",
        element: <PasswordResetSent />,
      },
    ],
  },
]);
