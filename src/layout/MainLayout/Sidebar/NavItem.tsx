import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavItemProps } from "../../../types";
import { useDispatch } from "react-redux";
import { setActivePage } from "../../../store/slices/menuSlice";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

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
      <Link
        component={RouterLink}
        to={title == "My progress" ? pathname : path}
        sx={{
          width: "100%",
          textDecoration: "none",
          ...((title === "Study" || title == "My progress") && {
            cursor: "auto",
          }),
        }}
      >
        <Tooltip title={isOpen ? "" : title} placement="right">
          <ListItemButton
            disabled={title == "My progress"}
            sx={{ color: "text.secondary" }}
            selected={path === `/${currentLinkPath}`}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
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
              sx={{
                opacity: { md: isOpen ? 1 : 0 },
                transition: (theme) => theme.transitions.create("opacity"),
              }}
            />
          </ListItemButton>
        </Tooltip>
      </Link>
    </ListItem>
  );
};

export default NavItem;
