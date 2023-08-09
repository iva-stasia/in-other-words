import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Sidebar from "./Sidebar";
import { Box, Toolbar, styled } from "@mui/material";
import AppHeader from "./AppHeader";

const drawerWidth = 280;

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.user);
  const { isOpen } = useSelector((state: RootState) => state.menu);

  if (!user.email) {
    return <Navigate to={"/register"} />;
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
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Main open={isOpen}>
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </Box>
  );
};

export default MainLayout;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  overflow: "auto",
  height: "calc(100% - 64px)",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: "0",
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
    backgroundColor: theme.palette.backgroundSecond.main,
    marginLeft: 0,
    borderRadius: "12px 0 0 0",
  }),
}));
