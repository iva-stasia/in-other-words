import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DialogInitialState } from "../../types";

const initialState: DialogInitialState = {
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
