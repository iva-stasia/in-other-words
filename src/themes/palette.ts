import { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  primary: {
    main: '#6246ea',
    contrastText: '#fffffe',
  },
  secondary: {
    main: '#d1d1e9',
  },
  tertiary: {
    main: '#e45858',
    contrastText: '#fffffe',
  },
  background: {
    default: '#fffffe',
    paper: '#fffffe',
  },
  text: {
    primary: '#2b2c34',
    secondary: 'rgba(43,44,52,0.6)',
    disabled: 'rgba(43,44,52,0.38)',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#7f5af0',
    contrastText: '#fffffe',
  },
  secondary: {
    main: '#72757e',
  },
  tertiary: {
    main: '#2cb67d',
    contrastText: '#fffffe',
  },
  background: {
    paper: '#16161a',
    default: '#16161a',
  },
  text: {
    primary: '#fffffe',
    secondary: 'rgba(255,255,254,0.7)',
    disabled: 'rgba(255,255,254,0.5)',
  },
};
