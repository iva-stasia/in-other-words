import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Box, Toolbar } from "@mui/material";
import AppHeader from "./components/AppHeader";
import WordDataDialog from "../../pages/dialogs/word-data-dialog";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setLoading,
  setOwnWords,
  setWordSets,
} from "../../store/slices/wordSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { saveUser } from "../../store/slices/userSlice";
import useOwnWords from "../../hooks/useOwnWords";
import useWordSets from "../../hooks/useWordSets";
import { Main, MainContainer, MainLayoutContainer } from "./MainLayout.styled";
import PageHeader from "../../components/PageHeader";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words, loading } = useOwnWords();
  const wordSets = useWordSets();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(null));
        navigate("/login");
      }
    });
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(setOwnWords(words));
    dispatch(setWordSets(wordSets));
    dispatch(setLoading(loading));
  }, [words, wordSets, dispatch, loading]);

  return (
    <MainLayoutContainer>
      <AppHeader />
      <Sidebar />

      <MainContainer>
        <Toolbar />

        <Main>
          <PageHeader />
          <Outlet />
        </Main>
      </MainContainer>

      <WordDataDialog />
    </MainLayoutContainer>
  );
};

export default MainLayout;
