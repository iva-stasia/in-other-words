import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dialogInitialState } from "../../types";

const initialState: dialogInitialState = {
  isAddWordDialogOpen: false,
  isWordDataDialogOpen: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setAddWordDialog: (state, action: PayloadAction<boolean>) => {
      state.isAddWordDialogOpen = action.payload;
    },
    setWordDataDialog: (state, action: PayloadAction<boolean>) => {
      state.isAddWordDialogOpen = false;
      state.isWordDataDialogOpen = action.payload;
    },
  },
});

export const { setAddWordDialog, setWordDataDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
