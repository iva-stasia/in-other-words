import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Toolbar, styled } from "@mui/material";
import AppHeader from "./AppHeader";
import WordDataDialog from "../../pages/dialogs/WordDataDialog";
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

const drawerWidth = 280;

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
      }}
    >
      <AppHeader drawerWidth={drawerWidth} />
      <Sidebar />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Main>
          <Box sx={{ width: "100%", overflow: "auto", height: "100%" }}>
            <Outlet />
          </Box>
        </Main>
      </Box>
      <WordDataDialog />
    </Box>
  );
};

export default MainLayout;

const Main = styled("main")(({ theme }) => ({
  overflow: "auto",
  flexGrow: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: "12px 0 0 0",
  border: "3px solid",
  borderColor: theme.palette.backgroundSecond.main,
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
  },
}));
