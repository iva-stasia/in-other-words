import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dictionary from "../pages/dictionary";
import PasswordReset from "../pages/authentication/PasswordReset";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import WordSets from "../pages/word-sets";
import Study from "../pages/study";
import Flashcards from "../pages/study/views/flashcards";
import WordSet from "../pages/word-sets/views/word-set";
import Review from "../pages/study/views/review";
import ErrorPage from "../pages/error";

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
        element: <WordSet />,
      },
      {
        path: "/study",
        element: <Study />,
      },
      {
        path: "/study/flashcards",
        element: <Flashcards />,
      },
      {
        path: "/study/review",
        element: <Review />,
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
    ],
  },
]);
