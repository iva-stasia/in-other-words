import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dictionary from "../pages/Dictionary";
import PasswordReset from "../pages/authentication/PasswordReset";
import AuthLayout from "../layout/AuthLayout";
import WordSets from "../pages/WordSets";
import ErrorPage from "../pages/ErrorPage";
import Flashcards from "../pages/flashcards/Flashcards";
import StudyPage from "../pages/study/StudyPage";
import ReviewComponent from "../pages/study/components/review/ReviewComponent";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

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
        element: <StudyPage />,
      },
      {
        path: "/study/flashcards",
        element: <Flashcards />,
      },
      {
        path: "/study/review",
        element: <ReviewComponent />,
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
