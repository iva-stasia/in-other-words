import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Word,
  WordInitialState,
  WordOption,
} from "../../types";

const initialState: WordInitialState = {
  selectedWord: null,
  ownSortedWords: [],
};

export const wordSlice = createSlice({
  name: "selectedWord",
  initialState,
  reducers: {
    setSelectedWord: (state, action: PayloadAction<WordOption | null>) => {
      state.selectedWord = action.payload;
    },
    setOwnSortedWords: (state, action: PayloadAction<Word[]>) => {
      state.ownSortedWords = action.payload;
    },
  },
});

export const { setSelectedWord, setOwnSortedWords } = wordSlice.actions;
export default wordSlice.reducer;
