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

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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
        <IconButton
          sx={{ justifySelf: 'end', color: 'text.secondary' }}
          onClick={() => (dispatch(toggleColorMode()))}
          color="inherit">
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
