import { Box, BoxProps, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const MainLayoutContainer = styled(Box)({
  height: "100vh",
  display: "flex",
});

const MainContainer = styled(Box)({
  height: "100%",
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
  borderColor: theme.palette.backgroundSecond.main,
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    overflowY: "auto",
    paddingTop: theme.spacing(1),
    border: "3px solid",
    borderColor: theme.palette.backgroundSecond.main,
  },
}));

export { Main, MainLayoutContainer, MainContainer };
