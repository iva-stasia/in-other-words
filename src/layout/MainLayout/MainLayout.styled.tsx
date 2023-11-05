import { Box, BoxProps, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const MainLayoutContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",

  [theme.breakpoints.down("sm")]: {
    height: "100svh",
  },
}));

const MainContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const Main = styled(Box)<BoxProps & MotionProps>(({ theme }) => ({
  padding: theme.spacing(3),
  overflow: "hidden",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: "12px 0 0 0",
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    overflowY: "initial",
    paddingTop: theme.spacing(1),
  },
}));

export { Main, MainLayoutContainer, MainContainer };
