import { Box, styled } from "@mui/material";

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

const Main = styled("main")(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(0),
  overflow: "hidden",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: "12px 0 0 0",
  border: "3px solid",
  borderBottom: "none",
  borderColor: theme.palette.backgroundSecond.main,
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },
}));

export { Main, MainLayoutContainer, MainContainer };
