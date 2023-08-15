import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Sidebar from "./Sidebar";
import { Box, Toolbar, styled } from "@mui/material";
import AppHeader from "./AppHeader";
import WordDataDialog from "../../pages/dialogs/WordDataDialog";
import { useDispatch } from "react-redux";
import useWordSets from "../../hooks/useWordSets";
import { useEffect } from "react";
import { setWordSets } from "../../store/slices/wordSlice";

const drawerWidth = 280;

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { isOpen } = useSelector((state: RootState) => state.menu);
  const wordSets = useWordSets();

  useEffect(() => {
    if (!user.email) return;
    dispatch(setWordSets(wordSets));
  }, [wordSets, dispatch, user]);

  if (!user.email) {
    return <Navigate to={"/login"} />;
  }

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
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Main open={isOpen}>
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <Outlet />
          </Box>
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
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: "0",
  border: "3px solid",
  borderColor: theme.palette.backgroundSecond.main,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderRadius: "12px 0 0 0",
  }),
}));
