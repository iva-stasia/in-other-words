import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavItemProps } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../../../store/slices/menuSlice";
import { RootState } from "../../../store";
import { Link as RouterLink } from "react-router-dom";

const NavItem = ({ title, icon, path }: NavItemProps) => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state: RootState) => state.menu);

  return (
    <ListItem disablePadding sx={{ pb: 1 }}>
      <Link
        component={RouterLink}
        to={path}
        sx={{ width: "100%", textDecoration: "none" }}
      >
        <ListItemButton
          disabled={title == "Study" || title == "My progress"}
          sx={{ color: "text.secondary" }}
          selected={title === activePage}
          onClick={() => dispatch(setActivePage(title))}
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
