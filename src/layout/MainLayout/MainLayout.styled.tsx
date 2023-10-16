import { Box, styled } from "@mui/material";

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

const OutletContainer = styled(Box)({
  width: "100%",
  overflow: "auto",
  height: "100%",
});

export { Main, MainLayoutContainer, MainContainer, OutletContainer };
