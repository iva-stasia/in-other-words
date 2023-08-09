import { PaletteColor, SimplePaletteColorOptions } from "@mui/material";

export type {
  UserInitialState,
  ColorModeInitialState,
  PasswordResetInitialState,
  NavInitialState,
  AddWordDialogInitialState,
  SelectedWordInitialState,
} from "./sliceInitialStateProps";

export type {
  DrawerWidthProp,
  NavItemProps,
  UserProfileMenuProps,
  SearchProps,
} from "./componentProps";

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
