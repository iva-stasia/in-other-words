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
import Repetition from "../pages/study/views/repetition";
import ErrorPage from "../pages/error";
import WordToDefinition from "../pages/study/views/word-to-definition";
import DefinitionToWord from "../pages/study/views/definition-to-word";
import Settings from "../pages/settings";

export const routes = [
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
        path: "/study/repetition",
        element: <Repetition />,
      },
      {
        path: "/study/word-definition",
        element: <WordToDefinition />,
      },
      {
        path: "/study/definition-word",
        element: <DefinitionToWord />,
      },
      {
        path: "/settings",
        element: <Settings />,
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
];

export const router = createBrowserRouter(routes);
