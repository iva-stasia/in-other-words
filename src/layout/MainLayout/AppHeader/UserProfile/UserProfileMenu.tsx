import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { UserProfileMenuProps } from '../../../../types';
import { LogoutRounded, SettingsRounded } from '@mui/icons-material';
import { auth } from '../../../../firebase';
import { signOut } from 'firebase/auth';

const settings = [
  { title: 'Settings', icon: <SettingsRounded fontSize="small" /> },
  { title: 'Logout', icon: <LogoutRounded fontSize="small" /> },
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
  const handleClick = async (title: string) => {
    setAnchorElUser(null);
    if (title === 'Logout') {
      await logout();
    }
  };

  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      elevation={1}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={() => setAnchorElUser(null)}>
      {settings.map(({ title, icon }) => (
        <MenuItem
          key={title}
          onClick={() => handleClick(title)}
          disabled={title !== 'Logout'}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography textAlign="center">{title}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserProfileMenu;
