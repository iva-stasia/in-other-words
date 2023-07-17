import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  useTheme,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import LightThemeBgImage from '../../assets/images/auth-bg/auth-bg-light-theme.png';
import DarkThemeBgImage from '../../assets/images/auth-bg/auth-bg-dark-theme.png';
import { useDispatch } from 'react-redux';
import { toggleColorMode } from '../../store/reducers/colorModeSlice';
import { AuthWrapperProps } from '../../types';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { saveUser } from '../../store/reducers/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('from wrapper');
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(null));
      }
    });
  }, []);

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
        square>
        <Box
          sx={{
            my: 8,
            mx: 'auto',
            px: 4,
            maxWidth: '26rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography
            component="span"
            variant="h5"
            color="primary"
            fontFamily="Kavoon"
            mb={4}>
            In Other Words
          </Typography>
          {children}
        </Box>
        <IconButton onClick={() => dispatch(toggleColorMode())} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('${
            theme.palette.mode === 'light'
              ? LightThemeBgImage
              : DarkThemeBgImage
          }')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'left bottom',
        }}
      />
    </Grid>
  );
};

export default AuthWrapper;