import { PaletteMode } from "@mui/material";
import { Word, WordOption, WordSet } from ".";

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

export interface DialogInitialState {
  isAddWordDialogOpen: boolean;
  isWordDataDialogOpen: boolean;
  isCreateSetDialogOpen: boolean;
}

export interface WordInitialState {
  selectedWord: WordOption | null;
  ownSortedWords: Word[];
  wordSets: WordSet[];
}
