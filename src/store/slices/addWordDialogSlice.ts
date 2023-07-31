import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddWordDialogInitialState, SelectedWord } from "../../types";

const initialState: AddWordDialogInitialState = {
  selectedWord: {word: null, isCustom: false},
  isDialogOpen: false,
};

export const addWordDialogSlice = createSlice({
  name: "addWordDialog",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<SelectedWord>) => {
      state.selectedWord = action.payload;
    },
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
  },
});

export const { setWord, setDialog } = addWordDialogSlice.actions;
export default addWordDialogSlice.reducer;
