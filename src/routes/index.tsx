import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import MainLayout from "../layout/MainLayout";
import AllWords from "../pages/AllWords";
import PasswordReset from "../pages/authentication/PasswordReset";
import PasswordResetSent from "../pages/authentication/PasswordResetSent";
import AuthLayout from "../layout/AuthLayout";
import WordSets from "../pages/WordSets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AllWords />,
      },
      {
        path: "/word-sets",
        element: <WordSets />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
