import {
  BookRounded,
  CollectionsBookmarkRounded,
  SchoolRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Typography,
  List,
  useMediaQuery,
  Link,
} from "@mui/material";
import { DrawerWidthProp } from "../../../types";
import NavItem from "./NavItem";
import ColorModeSwitch from "../../../components/ColorModeSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { setMenu, toggleMenu } from "../../../store/slices/menuSlice";
import { useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";

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

const Sidebar = ({ drawerWidth }: DrawerWidthProp) => {
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
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          mt: matchUpMd ? "64px" : 0,
          width: drawerWidth,
          height: matchUpMd ? "calc(100% - 64px)" : "100%",
          boxSizing: "border-box",
          gap: "1rem",
          border: "none",
        },
      }}
      variant={matchUpMd ? "persistent" : "temporary"}
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
