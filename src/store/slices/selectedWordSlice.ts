import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectedWordInitialState, WordOption } from "../../types";

const initialState: SelectedWordInitialState = {
  selectedWord: null,
};

export const selectedWordSlice = createSlice({
  name: "addWordDialog",
  initialState,
  reducers: {
    setSelectedWord: (state, action: PayloadAction<WordOption | null>) => {
      state.selectedWord = action.payload;
    },
  },
});

export const { setSelectedWord } = selectedWordSlice.actions;
export default selectedWordSlice.reducer;
