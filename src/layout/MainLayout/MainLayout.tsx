import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Sidebar from './Sidebar';
import { Box, Toolbar, styled } from '@mui/material';
import AppHeader from './AppHeader';
import { useTheme } from '@emotion/react';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.backgroundSecond.main,
  borderRadius: '0',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.backgroundSecond.main,
    marginLeft: 0,
    borderRadius: '12px 0 0 0',
  }),
}));

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.user);
  const { isOpen } = useSelector((state: RootState) => state.menu);

  if (!user.email) {
    return <Navigate to={'/register'} />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
      }}>
      <AppHeader drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Toolbar />
        <Main open={isOpen}>
          <Outlet />
        </Main>
      </Box>
    </Box>
  );
};

export default MainLayout;
