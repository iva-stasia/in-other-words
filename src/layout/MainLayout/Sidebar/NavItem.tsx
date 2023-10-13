import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavItemProps } from "../../../types";
import { useDispatch } from "react-redux";
import { setActivePage } from "../../../store/slices/menuSlice";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavItem = ({ title, icon, path }: NavItemProps) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [currentLinkPath] = pathname.slice(1).split("/");

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
        <ListItemButton
          disabled={title == "My progress"}
          sx={{ color: "text.secondary" }}
          selected={path === `/${currentLinkPath}`}
          disableRipple
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
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default NavItem;
