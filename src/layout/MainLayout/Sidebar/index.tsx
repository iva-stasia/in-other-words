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
} from "@mui/material";
import { DrawerWidthProp } from "../../../types";
import NavItem from "./NavItem";
import ColorModeSwitch from "../../../components/ColorModeSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
// import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../../store/slices/menuSlice";

const pages = [
  {
    title: "All words",
    icon: <BookRounded />,
    path: "/",
  },
  {
    title: "Word sets",
    icon: <CollectionsBookmarkRounded />,
    path: "/",
  },
  {
    title: "Study",
    icon: <SchoolRounded />,
    path: "/",
  },
  {
    title: "My progress",
    icon: <TrendingUpRounded />,
    path: "/",
  },
];

const Sidebar = ({ drawerWidth }: DrawerWidthProp) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.menu);
  // const theme = useTheme();
  // const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpMd = useMediaQuery('(min-width:900px)');

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
