import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { DrawerWidthProp } from '../../../types';
import UserProfile from './UserProfile';
import SearchInput from './SearchInput';
import {
  MenuOpenRounded,
  MenuRounded,
  SearchRounded,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../../store/slices/menuSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const AppHeader = ({ drawerWidth }: DrawerWidthProp) => {
  const { isOpen } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
      }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Stack
          flexGrow="0"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexBasis: { xs: '0', md: drawerWidth } }}>
          <Typography
            variant="h6"
            color="primary"
            fontFamily="Kavoon"
            noWrap
            p={0}
            component="div"
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}>
            In Other Words
          </Typography>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: 'text.secondary' }}
            onClick={() => dispatch(toggleMenu())}>
            {isOpen ? <MenuOpenRounded /> : <MenuRounded />}
          </IconButton>
        </Stack>
        <Stack
          flexGrow="1"
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Box sx={{ flexGrow: 1, maxWidth: '24rem' }}>
            <SearchInput />
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
