import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavItemProps } from "../../../../types";
import { useDispatch } from "react-redux";
import { setActivePage } from "../../../../store/slices/menuSlice";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { StyledLink, StyledListItemText } from "./NavItem.styled";

const NavItem = ({ title, icon, path }: NavItemProps) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [currentLinkPath] = pathname.slice(1).split("/");
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  useEffect(() => {
    if (path === `/${currentLinkPath}`) {
      dispatch(setActivePage(title));
    }
  }, [currentLinkPath, path, title, dispatch]);

  return (
    <ListItem disablePadding sx={{ pb: 1 }}>
      <StyledLink
        component={RouterLink}
        to={title == "My progress" ? pathname : path}
      >
        <Tooltip title={isOpen ? "" : title} placement="right">
          <ListItemButton
            disableRipple
            disabled={title == "My progress"}
            sx={{ color: "text.secondary" }}
            selected={path === `/${currentLinkPath}`}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <StyledListItemText
              open={isOpen}
              primary={
                <Typography
                  variant="body1"
                  fontWeight={600}
                  p={0}
                  component="span"
                >
                  {title}
                </Typography>
              }
            />
          </ListItemButton>
        </Tooltip>
      </StyledLink>
    </ListItem>
  );
};

export default NavItem;
