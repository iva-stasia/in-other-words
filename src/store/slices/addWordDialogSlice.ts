import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddWordDialogInitialState } from "../../types";

const initialState: AddWordDialogInitialState = {
  isDialogOpen: false,
};

export const addWordDialogSlice = createSlice({
  name: "addWordDialog",
  initialState,
  reducers: {
    setAddWordDialog: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
  },
});

export const { setAddWordDialog } =
  addWordDialogSlice.actions;
export default addWordDialogSlice.reducer;
