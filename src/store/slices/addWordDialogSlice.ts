import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddWordDialogInitialState, WordOption } from "../../types";

const initialState: AddWordDialogInitialState = {
  selectedWord: null,
  isDialogOpen: false,
};

export const addWordDialogSlice = createSlice({
  name: "addWordDialog",
  initialState,
  reducers: {
    setSelectedWord: (state, action: PayloadAction<WordOption | null>) => {
      state.selectedWord = action.payload;
    },
    setAddWordDialog: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
  },
});

export const { setSelectedWord, setAddWordDialog } =
  addWordDialogSlice.actions;
export default addWordDialogSlice.reducer;
