import { Box, List, useMediaQuery, Link, Theme } from "@mui/material";
import NavItem from "./NavItem/NavItem";
import ColorModeSwitch from "../../../components/ColorModeSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { setMenu, toggleMenu } from "../../../store/slices/menuSlice";
import { useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { pages } from "../../../constants/pages";
import {
  AppTitle,
  ColorModeSwitchContainer,
  StyledDrawer,
} from "./Sidebar.styled";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const matchUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    if (matchUpMd) {
      dispatch(setMenu(true));
    }
  }, [matchUpMd, dispatch]);

  return (
    <StyledDrawer
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
          <AppTitle variant="h6" noWrap component="div">
            In Other Words
          </AppTitle>
        </Link>
        <List disablePadding>
          {pages.map(({ title, icon, path }) => (
            <NavItem key={title} title={title} icon={icon} path={path} />
          ))}
        </List>
      </Box>

      <ColorModeSwitchContainer>
        <ColorModeSwitch />
      </ColorModeSwitchContainer>
    </StyledDrawer>
  );
};

export default Sidebar;
