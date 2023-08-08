import {
  PaletteColor,
  PaletteMode,
  SimplePaletteColorOptions,
} from "@mui/material";
import { ReactNode } from "react";

declare module "@mui/material/styles" {
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

export interface SearchResult {
  query: { limit: string; page: string };
  results: { total: number; data: string[] };
}

export interface WordOption {
  word: string;
  source: "apiDictionary" | "ownDictionary" | "custom";
}

export interface WordDefinition {
  inputValue?: string;
  definition: string;
  partOfSpeech?: string;
}

export interface WordDefinitions {
  word: string;
  definitions: WordDefinition[];
}

export interface Word {
  word: string;
  definition: string;
  set: string;
  progress: number;
}

export type Order = "asc" | "desc";

// Slice initial state props

export interface UserInitialState {
  uid: string | null;
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

export interface AddWordDialogInitialState {
  selectedWord: WordOption | null;
  isDialogOpen: boolean;
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

export interface SearchProps {
  withIcon: boolean;
  inDialog: boolean;
}
