import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
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
import PageHeader from "../../components/PageHeader";
import useOwnWords from "../../hooks/useOwnWords";
import useWordSets from "../../hooks/useWordSets";

const drawerWidth = 280;

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
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
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Main open={isOpen}>
          <PageHeader />
          <Outlet />
        </Main>
      </Box>
      <WordDataDialog />
    </Box>
  );
};

export default MainLayout;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  overflow: "auto",
  flexGrow: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: "0",
  borderTop: "3px solid",
  borderColor: theme.palette.backgroundSecond.main,
  transition: "margin 195ms cubic-bezier(0.4, 0, 0.6, 1)",
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
  ...(open && {
    transition: "margin 225ms cubic-bezier(0.0, 0, 0.2, 1)",
    marginLeft: 0,
    borderRadius: "12px 0 0 0",
  }),
}));
