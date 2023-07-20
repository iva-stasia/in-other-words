import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { DrawerWidthProp } from '../../../types';
import { SearchRounded } from '@mui/icons-material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AppHeader = ({ drawerWidth }: DrawerWidthProp) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: 'backgroundSecond.main',
        // bgcolor: 'background.default',
        color: 'text.primary',
        // border: '1px solid red',
      }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Page
        </Typography>
        <Autocomplete
          freeSolo
          id="search"
          disableClearable
          sx={{ flexGrow: 0, flexBasis: '30%' }}
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search a word"
              size="small"
              sx={{ bgcolor: 'background.default' }}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={(e) => setAnchorElUser(e.currentTarget)}
              sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];
