import {
  AppBar,
  Box,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DrawerWidthProp } from "../../../types";
import UserProfile from "./UserProfile";
import Search from "../../../components/Search";
import { MenuOpenRounded, MenuRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../../store/slices/menuSlice";
import { RootState } from "../../../store";
import AddWordDialog from "../../../pages/dialogs/AddWordDialog";
import { NavLink as RouterLink } from "react-router-dom";

const AppHeader = ({ drawerWidth }: DrawerWidthProp) => {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Stack
          flexGrow="0"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexBasis: { xs: "0", md: drawerWidth } }}
        >
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
                display: { xs: "none", md: "flex" },
              }}
            >
              In Other Words
            </Typography>
          </Link>

          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "text.secondary" }}
            onClick={() => dispatch(toggleMenu())}
          >
            {isOpen ? <MenuOpenRounded /> : <MenuRounded />}
          </IconButton>
        </Stack>
        <Stack
          flexGrow="1"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ flexGrow: 1, maxWidth: "24rem" }}>
            <Search withIcon={true} inDialog={false} />
            <AddWordDialog />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <UserProfile />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
