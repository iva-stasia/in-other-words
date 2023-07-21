import {
  PaletteColor,
  PaletteMode,
  SimplePaletteColorOptions,
} from '@mui/material';
import { ReactNode } from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
    backgroundSecond: PaletteColor;
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

// Slice initial state props

export interface UserInitialState {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface ColorModeInitialState {
  setMode: PaletteMode | null;
  preferredMode: PaletteMode;
}

export interface PasswordResetInitialState {
  isResetEmailSent: boolean;
}

export interface NavInitialState {
  activePage: string;
  isOpen: boolean;
}

// Component props

export interface DrawerWidthProp {
  drawerWidth: number;
}

export interface NavItemProps {
  title: string;
  icon: ReactNode;
  path: string;
}

export interface UserProfileMenuProps {
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (anchorElUser: null | HTMLElement) => void;
}
