import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Word, WordOption, WordSet } from "../../types";

interface WordInitialState {
  selectedWord: WordOption | null;
  ownWords: Word[];
  ownSortedWords: Word[];
  wordSets: WordSet[];
  loading: boolean;
}

const initialState: WordInitialState = {
  selectedWord: null,
  ownWords: [],
  ownSortedWords: [],
  wordSets: [],
  loading: true,
};

export const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setSelectedWord: (state, action: PayloadAction<WordOption | null>) => {
      state.selectedWord = action.payload;
    },
    setOwnWords: (state, action: PayloadAction<Word[]>) => {
      state.ownWords = action.payload;
    },
    setOwnSortedWords: (state, action: PayloadAction<Word[]>) => {
      state.ownSortedWords = action.payload;
    },
    setWordSets: (state, action: PayloadAction<WordSet[]>) => {
      state.wordSets = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSelectedWord,
  setOwnWords,
  setOwnSortedWords,
  setLoading,
  setWordSets,
} = wordSlice.actions;
export default wordSlice.reducer;
