import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Word, WordInitialState, WordOption, WordSet } from "../../types";

const initialState: WordInitialState = {
  selectedWord: null,
  ownWords: [],
  ownSortedWords: [],
  wordSets: [],
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
  },
});

export const { setSelectedWord, setOwnWords, setOwnSortedWords, setWordSets } =
  wordSlice.actions;
export default wordSlice.reducer;
