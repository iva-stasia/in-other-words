import { PaletteMode } from '@mui/material';
import { WordOption } from '.';

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
  isDialogOpen: boolean;
}

export interface SelectedWordInitialState {
  selectedWord: WordOption | null;
}
