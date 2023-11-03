import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Toolbar } from "@mui/material";
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
import { saveUser, setLearningLog } from "../../store/slices/userSlice";
import useOwnWords from "../../hooks/useOwnWords";
import useWordSets from "../../hooks/useWordSets";
import { Main, MainContainer, MainLayoutContainer } from "./MainLayout.styled";
import PageHeader from "../../components/PageHeader";
import useGetUserLearning from "../../hooks/useGetUserLearning";
import useGetUserActivity from "../../hooks/useGetUserActivity";
import updateUserActivity from "../../utils/updateUserActivity";
import { setActivityLog } from "../../store/slices/activityLogSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words, loading } = useOwnWords();
  const wordSets = useWordSets();
  const learningLog = useGetUserLearning();
  const activityLog = useGetUserActivity();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUserActivity(user.uid).catch(console.error);
      } else {
        dispatch(saveUser(null));
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setOwnWords(words));
    dispatch(setWordSets(wordSets));
    dispatch(setLoading(loading));
    dispatch(setLearningLog(learningLog));
    dispatch(setActivityLog(activityLog));
  }, [words, wordSets, loading, learningLog, activityLog]);

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
