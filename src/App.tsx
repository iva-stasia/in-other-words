import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { getDesignTokens } from './themes';
import { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useDispatch } from 'react-redux';
import { setPreferColorMode } from './store/slices/colorModeSlice';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

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
  }, [prefersDarkMode, dispatch]);

  const theme = useMemo(() => {
    const color = createTheme();
    return createTheme(getDesignTokens(color, colorMode));
  }, [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
