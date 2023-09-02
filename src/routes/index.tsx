import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import MainLayout from "../layout/MainLayout";
import Dictionary from "../pages/Dictionary";
import PasswordReset from "../pages/authentication/PasswordReset";
import PasswordResetSent from "../pages/authentication/PasswordResetSent";
import AuthLayout from "../layout/AuthLayout";
import WordSets from "../pages/WordSets";
import ErrorPage from "../pages/ErrorPage";
import Study from '../pages/Study';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dictionary />,
      },
      {
        path: "/word-sets",
        element: <WordSets />,
      },
      {
        path: "/word-sets/:setTitle",
        element: <Dictionary />,
      },
      {
        path: "/study",
        element: <Study />,
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
