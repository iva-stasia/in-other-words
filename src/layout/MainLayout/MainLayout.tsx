import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Sidebar from './Sidebar';
import {
  Box,
  Toolbar,
} from '@mui/material';
import AppHeader from './AppHeader';

const drawerWidth = 280;

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.email) {
    return <Navigate to={'/register'} />;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <AppHeader drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'backgroundSecond.main',
          px: 3,
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
