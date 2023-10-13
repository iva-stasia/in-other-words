import { PaletteColor, SimplePaletteColorOptions } from "@mui/material";

export type {
  UserInitialState,
  ColorModeInitialState,
  PasswordResetInitialState,
  NavInitialState,
  DialogInitialState,
  WordInitialState,
} from "./sliceInitialStateProps";

export type {
  DrawerWidthProp,
  NavItemProps,
  UserProfileMenuProps,
  SearchProps,
  AudioPlayerProps,
  AlertMessageProps,
  JdenticonGeneratorProps,
  CreateSetDialogProps,
  DeleteSetDialogProps,
  DefinitionInputProps,
  EnhancedTableProps,
  HeadCell,
  EnhancedTableToolbarProps,
  WordTableProps,
  WordSetSelectProps,
  UpdateWordDialogProps,
} from "./componentProps";

export type {
  WordOption,
  WordDefinition,
  WordApiResult,
  WordAudioResult,
  WordApiData,
  Word,
} from "./wordData";

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

export type Order = "asc" | "desc";

export interface WordSet {
  pictureId: string;
  title: string;
}

export enum Progress {
  New,
  Step1,
  Step2,
  Step3,
  Learnt,
}

export enum Answer {
  Fail,
  PassHard,
  Pass,
  PassEasy,
}
