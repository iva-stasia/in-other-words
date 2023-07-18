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

export type mode = 'light' | 'dark';

export interface colorModeInitialState {
  setMode: mode | null;
  preferredMode: mode;
}

export interface PasswordResetInitialState {
  isResetEmailSent: boolean;
}
