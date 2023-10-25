import {
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { LogoutRounded, SettingsRounded } from "@mui/icons-material";
import { auth } from "../../../../../../../firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../store";
import { useNavigate } from "react-router-dom";

interface UserProfileMenuProps {
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (anchorElUser: null | HTMLElement) => void;
}

interface Setting {
  title: string;
  icon: JSX.Element;
  path?: string;
}

const settings: Setting[] = [
  {
    title: "Settings",
    icon: <SettingsRounded fontSize="small" />,
    path: "/settings",
  },
  { title: "Logout", icon: <LogoutRounded fontSize="small" /> },
];

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};

const UserProfileMenu = ({
  anchorElUser,
  setAnchorElUser,
}: UserProfileMenuProps) => {
  const { displayName } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleClick = async (item: Setting) => {
    setAnchorElUser(null);
    if (item.title === "Logout") {
      await logout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      elevation={6}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={() => setAnchorElUser(null)}
    >
      <Box>
        <Typography py={1} px={2}>
          Hi {displayName || ""} 👋
        </Typography>
      </Box>
      <Divider />
      {settings.map((item) => (
        <MenuItem key={item.title} onClick={() => handleClick(item)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <Typography textAlign="center">{item.title}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserProfileMenu;
