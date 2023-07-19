import { PaletteMode, Theme } from '@mui/material';
import { darkPalette, lightPalette } from './palette';

export const getDesignTokens = (theme: Theme, mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? lightPalette : darkPalette),
  },
  typography: {
    fontFamily: 'Nunito, Arial',
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      fontFamily: 'Nunito, Arial',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
          },
        },
      },
    },
  },
});
