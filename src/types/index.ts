import {
  PaletteColor,
  PaletteMode,
  SimplePaletteColorOptions,
} from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
  }

  interface PaletteOptions {
    tertiary: SimplePaletteColorOptions;
    backgroundSecond: SimplePaletteColorOptions;
  }
}

export interface UserEmail {
  email: string;
}

export interface UserRegisterInput extends UserEmail {
  password: string;
}

export interface UserLoginInput extends UserRegisterInput {
  remember: boolean;
}

export interface UserInitialState {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface colorModeInitialState {
  setMode: PaletteMode | null;
  preferredMode: PaletteMode;
}

export interface PasswordResetInitialState {
  isResetEmailSent: boolean;
}

export interface DrawerWidthProp {
  drawerWidth: number;
}
