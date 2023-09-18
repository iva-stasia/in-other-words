import {
  BookRounded,
  CollectionsBookmarkRounded,
  SchoolRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  List,
  useMediaQuery,
  Link,
  CSSObject,
  styled,
  Theme,
} from "@mui/material";
import NavItem from "./NavItem";
import ColorModeSwitch from "../../../components/ColorModeSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { setMenu, toggleMenu } from "../../../store/slices/menuSlice";
import { useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";

const pages = [
  {
    title: "Dictionary",
    icon: <BookRounded />,
    path: "/",
  },
  {
    title: "Word sets",
    icon: <CollectionsBookmarkRounded />,
    path: "/word-sets",
  },
  {
    title: "Study",
    icon: <SchoolRounded />,
    path: "/study",
  },
  {
    title: "My progress",
    icon: <TrendingUpRounded />,
    path: "/my-progress",
  },
];

const drawerWidth = 280;

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const matchUpMd = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    if (matchUpMd) {
      dispatch(setMenu(true));
    }
  }, [matchUpMd, dispatch]);

  return (
    <Drawer
      variant={matchUpMd ? "permanent" : "temporary"}
      open={isOpen}
      {...(matchUpMd ? {} : { onClick: () => dispatch(toggleMenu()) })}
      ModalProps={{ keepMounted: true }}
      anchor="left"
    >
      <Box px={2} pt={2}>
        <Link
          component={RouterLink}
          to="/"
          sx={{ width: "100%", textDecoration: "none" }}
        >
          <Typography
            variant="h6"
            color="primary"
            fontFamily="Kavoon"
            noWrap
            p={0}
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              pb: 2,
            }}
          >
            In Other Words
          </Typography>
        </Link>
        <List disablePadding>
          {pages.map(({ title, icon, path }) => (
            <NavItem key={title} title={title} icon={icon} path={path} />
          ))}
        </List>
      </Box>
      <Box
        sx={{
          mb: 2,
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <ColorModeSwitch />
      </Box>
    </Drawer>
  );
};

export default Sidebar;

const openedMixin = (theme: Theme): CSSObject => ({
  marginTop: 64,
  height: "calc(100% - 64px)",
  width: drawerWidth,
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

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    borderRight: "none",
    width: drawerWidth,
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
