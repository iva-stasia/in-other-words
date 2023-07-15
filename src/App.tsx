import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { getDesignTokens } from './themes';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useDispatch } from 'react-redux';
import { setPreferColorMode } from './store/reducers/colorModeSlice';

function App() {
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const colorMode = useSelector((state: RootState) =>
    state.colorMode.setMode
      ? state.colorMode.setMode
      : state.colorMode.preferredMode
  );

  useEffect(() => {
    dispatch(setPreferColorMode(prefersDarkMode ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(
    () => createTheme(getDesignTokens(colorMode)),
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Register />
    </ThemeProvider>
  );
}

export default App;
