import {
  Box,
  CSSObject,
  Drawer,
  Theme,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { DRAWER_WIDTH } from "../../../../constants";

const openedMixin = (theme: Theme): CSSObject => ({
  marginTop: 64,
  height: "calc(100% - 64px)",
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  marginTop: 64,
  height: "calc(100% - 64px)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 88,
});

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    borderRight: "none",
    width: DRAWER_WIDTH,
  },
  [theme.breakpoints.up("md")]: {
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  },
}));

const AppTitle = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: theme.spacing(2),
  fontFamily: "Kavoon",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const ColorModeSwitchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  flexGrow: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
}));

export { StyledDrawer, AppTitle, ColorModeSwitchContainer };
