import { PaletteColor, SimplePaletteColorOptions } from "@mui/material";
import { Word } from ".";
import { Timestamp } from "firebase/firestore";

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
  Learned,
}

export enum Answer {
  Fail,
  PassHard,
  Pass,
  PassEasy,
}

export interface QuizQuestion {
  term: string;
  answer: string;
  options: string[];
  origin: Word;
  audio?: string;
}

export interface UserProfile {
  photoURL: unknown;
  displayName: string | undefined;
  email: string;
}

export interface UserData {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  lastLoginDate?: Timestamp | null;
  activityLog?: Timestamp[] | null;
}
