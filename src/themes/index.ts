import { PaletteMode } from '@mui/material';
import { darkPalette, lightPalette } from './palette';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? lightPalette : darkPalette),
  },
  typography: {
    fontFamily: 'Nunito',
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      fontFamily: 'Montserrat, Arial',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
